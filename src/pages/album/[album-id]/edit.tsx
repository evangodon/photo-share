import { useEffect } from 'react';
import styled from 'styled-components';
import { Flex } from 'rebass';
import { useRouter } from 'next/router';
import { GetServerSideProps, NextPage } from 'next';
import { ArrowLeft as ArrowLeftIcon, Save as SaveIcon } from 'react-feather';
import { useMutation } from 'urql';
import { toast } from 'react-toastify';
import { withPageLayout } from '@/components/layout';
import { Button } from '@/components/interactive';
import { H2 } from '@/components/typography';
import { AlbumTabs } from '@/components/album';
import { EditedAlbum } from '@/types';
import { getIdFromSlug } from '@/utils/index';
import { FindAlbumById } from '@/graphql/queries';
import { FindAlbumByIdQuery } from '@/graphql/generated';
import { getPhotoIdFromUrl } from '@/utils/photoData';
import { faunadb } from '@/lib/faundb';
import { useAlbumReducer } from '@/hooks';
import { useAuthContext } from '@/context';

const EditAlbum = /* GraphQL */ `
  mutation PartialUpdateAlbum(
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
  const albumId = context.params['album-id'];

  const { data, errors } = await faunadb.query<FindAlbumByIdQuery>(FindAlbumById, {
    variables: { albumId },
  });

  if (errors) {
    throw new Error(errors[0].message);
  }

  return {
    props: {
      album: data.findAlbumByID,
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
    const { title, coverPhoto, photoOrder, photos } = editedAlbum;

    const variables = {
      id,
      title,
      coverPhoto,
      photoOrder,
      // @ts-ignore
      photos: photos.data.filter((photo) => Boolean(!photo._id)),
    };

    editAlbum(variables).then((result) => {
      if (result.error) {
        console.error(result.error);
        return;
      }

      toast('Album Updated!');

      router.push('/');
    });
  }

  const handlePhotoUpload = (url: string) => {
    const photoId = getPhotoIdFromUrl(url);
    const photo = { url, photoId, postedBy: { connect: user._id } };
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
