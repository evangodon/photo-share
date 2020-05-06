import { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Label, Input } from '@rebass/forms/styled-components';
import { Box, Flex } from 'rebass';
import {
  Upload as UploadIcon,
  Layout as LayoutIcon,
  ArrowLeft as ArrowLeftIcon,
} from 'react-feather';
import { useMutation } from 'urql';
import withPageLayout from '@/components/layout/withPageLayout';
import ImageUpload from '@/components/ImageUpload';
import { H2 } from '@/components/typography';
import { Button, AlbumCard } from '@/components';

const CreateAlbum = /* GraphQL */ `
  mutation CreateAlbum($title: String!, $coverPhoto: String, $photos: {url: String!}[] ) {
    createAlbum(data: {title: $title, photos: {create: $photos } }) {
      _id
      title
    }
  }
`;

type Tab = 'upload' | 'layout';

/**
 * Page for creating an album.
 *
 * @TODO: Finish the create Album mutation
 *
 */
const Create = () => {
  const [tab, setTab] = useState<Tab>('upload');
  const [createAlbumResult, createAlbum] = useMutation(CreateAlbum);
  const [title, setTitle] = useState('');
  const [coverPhoto, setCoverPhoto] = useState(
    'https://source.unsplash.com/random'
  );
  const [photos, setPhotos] = useState([]);

  function handleCreateAlbum() {
    const variables = { title, coverPhoto, photos };
    createAlbum(variables).then((result) => {});
  }

  function handleTabChange(tab: Tab) {
    return () => setTab(tab);
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
          <Flex width={100} alignItems="center">
            <Link href="/" passHref>
              <Button>
                <ArrowLeftIcon size={15} />
                back
              </Button>
            </Link>
          </Flex>
          <H2>Create an album</H2>
          <Flex width={100}>
            <Button>Create</Button>
          </Flex>
        </Flex>
        <Box mb={40}>
          <AlbumCard editable album={album} />
        </Box>

        <Tabs>
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

        {
          {
            upload: (
              <ImageUploadContainer>
                <ImageUpload />
              </ImageUploadContainer>
            ),
            layout: <span>photo layout</span>,
          }[tab]
        }
      </Container>

      <style global jsx>{`
        .filepond--item {
          width: calc(25% - 0.5rem);
        }

        .filepond--root {
          min-height: 80em;
        }

        .filepond--panel-root {
          min-height: 30rem;
        }

        .filepond--drop-label {
          margin-top: 3rem;
        }

        .filepond--drop-label label {
          color: #555;
          font-size: 18px;
        }
      `}</style>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    margin-bottom: 8rem;
  }
`;

const ImageUploadContainer = styled.div`
  width: 100%;
  margin-top: 3rem;
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
    props.isActive ? props.theme.__color_primary : 'default'};
  border-bottom: 2px solid
    ${(props) => (props.isActive ? 'currentColor' : 'transparent')};

  svg {
    margin-right: 0.4rem;
  }
`;

export default withPageLayout(Create);
