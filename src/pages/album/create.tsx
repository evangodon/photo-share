import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { nanoid } from 'nanoid';
import styled from 'styled-components';
import { Box, Flex } from 'rebass';
import { ArrowLeft as ArrowLeftIcon } from 'react-feather';
import { useMutation } from 'urql';
import { withPageLayout, ImageGrid } from '@/components/layout';
import { H2 } from '@/components/typography';
import { Button } from '@/components';
import AlbumTabs from './_components/AlbumTabs';
import { useAlbumReducer } from '@/hooks';
import { Photo } from '@/types';

const CreateAlbum = /* GraphQL */ `
  mutation CreateAlbum(
    $title: String!
    $coverPhoto: String
    $photoOrder: [String]!
    $photos: [PhotoInput!]!
  ) {
    createAlbum(
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

/**
 * Page for creating an album.
 *
 * @todo: Make intuitive on how to change title
 * @todo: Generate mutation hook with codegen
 * @todo: Handle successful create
 * @todo: Handle error during create
 * @todo: Persist photos that were just uploaded
 */
const Create = () => {
  const [_, createAlbum] = useMutation(CreateAlbum);
  const { album, albumDispatch } = useAlbumReducer();
  const [coverPhoto, setCoverPhoto] = useState('');
  const router = useRouter();

  useEffect(() => {
    const photos = album.photos.data;

    if (!coverPhoto && photos.length > 0) {
      albumDispatch({
        type: 'update:cover_photo',
        payload: { url: photos[0].url },
      });
    }
  }, [album.photos.data]);

  function handleCreateAlbum() {
    const { title, coverPhoto, photoOrder } = album;
    const variables = {
      title,
      coverPhoto,
      photoOrder,
      photos: album.photos.data,
    };

    createAlbum(variables).then((result) => {
      if (result.error) {
        console.error(result.error);
      }

      router.push('/');
    });
  }

  const handlePhotoUpload = (url: string) => {
    const photo = { url, id: nanoid() };
    albumDispatch({ type: 'create:photo', payload: { photo } });
  };

  return (
    <>
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
          <H2>Create an album</H2>
          <Flex width={200} justifyContent="flex-end">
            <Button variant="contained" onClick={handleCreateAlbum}>
              Create
            </Button>
          </Flex>
        </Flex>
        <AlbumTabs
          handlePhotoUpload={handlePhotoUpload}
          albumDispatch={albumDispatch}
          album={album}
        />
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default withPageLayout(Create);
