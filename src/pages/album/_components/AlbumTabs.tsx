import { useState } from 'react';
import styled from 'styled-components';
import {
  Upload as UploadIcon,
  Layout as LayoutIcon,
  Image as ImageIcon,
} from 'react-feather';
import { EditedAlbum } from '@/types';
import { Box } from 'rebass';
import ImageUpload from '@/components/ImageUpload';
import ImageGridEditable from '@/components/ImageGridEditable';
import { AlbumCard } from '@/components';
import { AlbumDispatch } from '@/hooks';

type Tab = 'cover' | 'upload' | 'layout';
type Props = {
  handlePhotoUpload: (url: string) => void;
  album: EditedAlbum;
  albumDispatch: AlbumDispatch;
};

const AlbumTabs = ({ handlePhotoUpload, album, albumDispatch }: Props) => {
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
        <TabItem isActive={tab === 'upload'} onClick={handleTabChange('upload')}>
          <UploadIcon />
          Upload
        </TabItem>
        <TabItem isActive={tab === 'layout'} onClick={handleTabChange('layout')}>
          <LayoutIcon />
          Layout
        </TabItem>
      </Tabs>

      {album && (
        <Box width="100%" mt="3rem">
          {
            {
              cover: (
                <Box maxWidth="50rem" m={[0, 'auto']}>
                  <AlbumCard editable albumDispatch={albumDispatch} album={album} />
                </Box>
              ),
              upload: <ImageUpload handlePhotoUpload={handlePhotoUpload} />,
              layout: <ImageGridEditable album={album} albumDispatch={albumDispatch} />,
            }[tab]
          }
        </Box>
      )}
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

  color: ${(props) => (props.isActive ? props.theme.colors.primary : 'default')};
  border-bottom: 2px solid ${(props) => (props.isActive ? 'currentColor' : 'transparent')};

  svg {
    margin-right: 0.6rem;
  }
`;

export default AlbumTabs;
