import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Box, Flex } from 'rebass';
import { ArrowLeft as ArrowLeftIcon } from 'react-feather';
import { useMutation } from 'urql';
import { withPageLayout, ImageGrid } from '@/components/layout';
import { H2 } from '@/components/typography';
import { Button } from '@/components';
import AlbumTabs from './_components/AlbumTabs';
import { Photo } from '@/types';

const CreateAlbum = /* GraphQL */ `
  mutation CreateAlbum(
    $title: String!
    $coverPhoto: String
    $photos: [PhotoInput!]!
  ) {
    createAlbum(
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
  const [_createAlbumResult, createAlbum] = useMutation(CreateAlbum);
  const [title, setTitle] = useState('Add a Title');
  const [coverPhoto, setCoverPhoto] = useState('');
  const [photos, setPhotos] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!coverPhoto && photos.length > 0) {
      setCoverPhoto(photos[0].url);
    }
  }, [photos]);

  function handleCreateAlbum() {
    const variables = { title, coverPhoto, photos };

    createAlbum(variables).then((result) => {
      router.push('/');
    });
  }

  const handlePhotoUpload = (photo: Photo) => {
    setPhotos((photos) => [...photos, photo]);
  };

  function handleTitleChange(title: string) {
    setTitle(title);
  }

  const album = {
    _id: '-1',
    title,
    coverPhoto,
    photos: { data: photos },
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
          handleTitleChange={handleTitleChange}
          photos={photos}
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
