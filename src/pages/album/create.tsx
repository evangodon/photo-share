import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Box, Flex } from 'rebass';
import {
  Upload as UploadIcon,
  Layout as LayoutIcon,
  Image as ImageIcon,
  ArrowLeft as ArrowLeftIcon,
} from 'react-feather';
import { useMutation } from 'urql';
import { withPageLayout, ImageGrid } from '@/components/layout';
import ImageUpload from '@/components/ImageUpload';
import { H2 } from '@/components/typography';
import { Button, AlbumCard } from '@/components';

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

type Tab = 'cover' | 'upload' | 'layout';

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
  const [tab, setTab] = useState<Tab>('cover');
  const [_createAlbumResult, createAlbum] = useMutation(CreateAlbum);
  const [title, setTitle] = useState('Add a Title');
  const [coverPhoto, setCoverPhoto] = useState('');
  const [photos, setPhotos] = useState<{ url: string }[]>([]);
  const [files, setFiles] = useState<File[]>([]);
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

  function handleTabChange(tab: Tab) {
    return () => setTab(tab);
  }

  const handlePhotoUpload = (photo: { url: string }) => {
    setPhotos((photos) => [...photos, photo]);
  };

  function handleTitleChange(title: string) {
    setTitle(title);
  }

  const album = {
    _id: '-1',
    title,
    coverPhoto,
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

        <Tabs>
          <TabItem
            isActive={tab === 'cover'}
            onClick={handleTabChange('cover')}
          >
            <ImageIcon />
            Cover
          </TabItem>
          <TabItem
            isActive={tab === 'upload'}
            onClick={handleTabChange('upload')}
          >
            <UploadIcon />
            Upload
          </TabItem>
          <TabItem
            isActive={tab === 'layout'}
            onClick={handleTabChange('layout')}
          >
            <LayoutIcon />
            Layout
          </TabItem>
        </Tabs>

        <Box width="100%" mt="3rem">
          {
            {
              cover: (
                <Box maxWidth="50rem" m={[0, 'auto']}>
                  <AlbumCard
                    editable
                    handleInput={handleTitleChange}
                    album={album}
                  />
                </Box>
              ),
              upload: (
                <ImageUpload
                  files={files}
                  setFiles={setFiles}
                  handlePhotoUpload={handlePhotoUpload}
                />
              ),
              layout: <ImageGrid photos={photos} />,
            }[tab]
          }
        </Box>
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

const Tabs = styled.div`
  margin-top: 3rem;
`;

const TabItem = styled.button<{ isActive }>`
  display: inline-flex;
  align-items: center;
  margin: 0 2rem;
  padding: 1rem 0;
  cursor: pointer;

  color: ${(props) =>
    props.isActive ? props.theme.colors.primary : 'default'};
  border-bottom: 2px solid
    ${(props) => (props.isActive ? 'currentColor' : 'transparent')};

  svg {
    margin-right: 0.6rem;
  }
`;

export default withPageLayout(Create);
