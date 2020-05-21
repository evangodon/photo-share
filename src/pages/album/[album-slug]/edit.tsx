import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Box, Flex } from 'rebass';
import { useRouter } from 'next/router';
import { GetServerSideProps, NextPage } from 'next';
import {
  Upload as UploadIcon,
  Layout as LayoutIcon,
  Image as ImageIcon,
  ArrowLeft as ArrowLeftIcon,
} from 'react-feather';
import { useMutation } from 'urql';
import Link from 'next/link';
import { withPageLayout } from '@/components/layout';
import { Button, AlbumCard } from '@/components';
import { H2 } from '@/components/typography';
import AlbumTabs from '@/pages/album/_components/AlbumTabs';
import { Photo, Album } from '@/types';
import { getIdFromSlug } from '@/utils/index';
import { FindAlbumById } from '@/graphql/queries';
import { FindAlbumByIdQuery, GetAlbumsQuery } from '@/graphql/generated';
import { faunadb } from '@/lib/faundb';

const EditAlbum = /* GraphQL */ `
  mutation UpdateAlbum(
    $id: ID!
    $title: String!
    $coverPhoto: String
    $photos: [PhotoInput!]!
  ) {
    updateAlbum(
      id: $id
      data: {
        title: $title
        coverPhoto: $coverPhoto
        photos: { create: $photos }
      }
    ) {
      _id
      title
    }
  }
`;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { url } = context.req;
  const albumID = getIdFromSlug(url.replace('/edit', '').split('/').pop());

  const { data, errors } = await faunadb.query<FindAlbumByIdQuery>(
    FindAlbumById,
    {
      variables: { albumID },
    }
  );

  if (errors) {
    throw new Error(errors[0].message);
  }

  return {
    props: { album: data.findAlbumByID },
  };
};

type Props = NextPage & { album: any };

/**
 * Page for editing an album
 */
const Edit = ({ album }: Props) => {
  const [title, setTitle] = useState(album.title);
  const [coverPhoto, setCoverPhoto] = useState(album.coverPhoto);
  const [newPhotos, setNewPhotos] = useState<Photo[]>([]);
  const [_, editAlbum] = useMutation(EditAlbum);
  const router = useRouter();

  useEffect(() => {
    if (!coverPhoto && newPhotos.length > 0) {
      setCoverPhoto(newPhotos[0].url);
    }
  }, [newPhotos]);

  function handleSave() {
    const slug = router.query['album-slug'] as string;
    const id = getIdFromSlug(slug);

    const variables = { id, title, coverPhoto, photos: newPhotos };

    editAlbum(variables).then((result) => {
      router.push('/');
    });
  }

  const handlePhotoUpload = (photo: { url: string }) => {
    setNewPhotos((photos) => [...photos, photo]);
  };

  function handleTitleChange(title: string) {
    setTitle(title);
  }

  return (
    <Container>
      <Flex
        mb={50}
        width="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex width={200} alignItems="center">
          <Link href="/" passHref>
            <Button>
              <ArrowLeftIcon size={15} />
              Back
            </Button>
          </Link>
        </Flex>
        <H2>Edit album</H2>
        <Flex width={200} justifyContent="flex-end">
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Flex>
      </Flex>
      <AlbumTabs
        handleTitleChange={handleTitleChange}
        handlePhotoUpload={handlePhotoUpload}
        photos={newPhotos}
        album={{ _id: album._id, title, coverPhoto, photos: album.photos.data }}
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
