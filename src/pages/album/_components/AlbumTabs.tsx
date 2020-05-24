import { useState } from 'react';
import styled from 'styled-components';
import {
  Upload as UploadIcon,
  Layout as LayoutIcon,
  Image as ImageIcon,
} from 'react-feather';
import { Photo, Album } from '@/types';
import { ImageGrid } from '@/components/layout';
import { Box, Flex } from 'rebass';
import ImageUpload from '@/components/ImageUpload';
import { Button, AlbumCard } from '@/components';

type Tab = 'cover' | 'upload' | 'layout';

type Props = {
  handleTitleChange: (title: string) => void;
  handlePhotoUpload: (photo: Photo) => void;
  setPhotos?: (photos: any[]) => void;
  photos: Photo[];
  album: Album;
};

const AlbumTabs = ({
  handleTitleChange,
  handlePhotoUpload,
  setPhotos,
  photos,
  album,
}: Props) => {
  const [tab, setTab] = useState<Tab>('cover');

  function handleTabChange(tab: Tab) {
    return () => setTab(tab);
  }

  return (
    <>
      <Tabs>
        <TabItem isActive={tab === 'cover'} onClick={handleTabChange('cover')}>
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
            upload: <ImageUpload handlePhotoUpload={handlePhotoUpload} />,
            layout: (
              <ImageGrid photos={photos} setPhotos={setPhotos} editable />
            ),
          }[tab]
        }
      </Box>
    </>
  );
};

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
export default AlbumTabs;
