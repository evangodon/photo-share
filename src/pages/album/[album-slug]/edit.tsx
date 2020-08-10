import { useEffect } from 'react';
import styled from 'styled-components';
import { Flex } from 'rebass';
import { useRouter } from 'next/router';
import { GetServerSideProps, NextPage } from 'next';
import { ArrowLeft as ArrowLeftIcon, Save as SaveIcon } from 'react-feather';
import { useMutation } from 'urql';
import { nanoid } from 'nanoid';
import { withPageLayout } from '@/components/layout';
import { Button } from '@/components/interaction';
import { H2 } from '@/components/typography';
import { AlbumTabs } from '@/components/album';
import { EditedAlbum } from '@/types';
import { getIdFromSlug } from '@/utils/index';
import { FindAlbumById } from '@/graphql/queries';
import { FindAlbumByIdQuery } from '@/graphql/generated';
import { faunadb } from '@/lib/faundb';
import { useAlbumReducer } from '@/hooks';
import { useAuthContext } from '@/context';
import { createPhotoList, createPhotoDictionary } from '@/utils/photoData';

const EditAlbum = /* GraphQL */ `
  mutation UpdateAlbum(
    $id: ID!
    $title: String!
    $coverPhoto: String
    $photoOrder: [String]!
    $photos: [PhotoInput!]!
  ) {
    updateAlbum(
      id: $id
      data: {
        title: $title
        coverPhoto: $coverPhoto
        photoOrder: $photoOrder
        photos: { create: $photos }
      }
    ) {
      _id
      title
    }
  }
`;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const albumSlug = Array.isArray(context.params['album-slug'])
    ? context.params['album-slug'][0]
    : context.params['album-slug'];

  const albumID = albumSlug.split('-').pop();

  const { data, errors } = await faunadb.query<FindAlbumByIdQuery>(FindAlbumById, {
    variables: { albumID },
  });

  if (errors) {
    throw new Error(errors[0].message);
  }

  const album = {
    ...data.findAlbumByID,
    photos: {
      data: createPhotoDictionary(data.findAlbumByID.photos.data),
    },
  };

  return {
    props: {
      album,
    },
  };
};

type Props = NextPage & { album: EditedAlbum };

/**
 * Page for editing an album
 *
 * @todo: handle errors when clicking save
 */
const Edit = ({ album }: Props) => {
  const { user } = useAuthContext();
  const { album: editedAlbum, albumDispatch } = useAlbumReducer(album);

  const [_, editAlbum] = useMutation(EditAlbum);
  const router = useRouter();

  useEffect(() => {
    const photos = album.photos.data;

    if (!album.coverPhoto && Object.keys(photos).length > 0) {
      albumDispatch({
        type: 'update:cover_photo',
        payload: { url: photos[0].url },
      });
    }
  }, [album.photos.data]);

  function handleSave() {
    const slug = router.query['album-slug'] as string;
    const id = getIdFromSlug(slug);
    const { title, coverPhoto, photoOrder } = editedAlbum;

    const variables = {
      id,
      title,
      coverPhoto,
      photoOrder,
      photos: createPhotoList(editedAlbum.photos.data),
    };

    editAlbum(variables).then((result) => {
      if (result.error) {
        console.error(result.error);
        return;
      }

      router.push('/');
    });
  }

  const handlePhotoUpload = (url: string) => {
    const photo = {
      url,
      id: nanoid(),
      postedBy: { connect: user._id },
    };

    albumDispatch({ type: 'create:photo', payload: { photo } });
  };

  return (
    <Container>
      <Flex mb={50} width="100%" justifyContent="space-between" alignItems="center">
        <Flex width={200} alignItems="center">
          <Button onClick={router.back} icon={<ArrowLeftIcon size={18} />}>
            Back
          </Button>
        </Flex>
        <H2>Edit album</H2>
        <Flex width={200} justifyContent="flex-end">
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Flex>
      </Flex>
      <AlbumTabs
        album={editedAlbum}
        albumDispatch={albumDispatch}
        handlePhotoUpload={handlePhotoUpload}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default withPageLayout(Edit);
