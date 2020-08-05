import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
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
  const router = useRouter();
  const tabQuery = router.query.tab as Tab;
  const [tab, setTab] = useState<Tab>(tabQuery ?? 'cover');

  useEffect(() => {
    const tabQuery = router.query.tab;
    const tab = Array.isArray(tabQuery) ? tabQuery[0] : tabQuery;
    if (tab) {
      setTab(router.query.tab as Tab);
    }
  }, [router.query.tab]);

  function updateUrlParams(tab: Tab) {
    return () => {
      router.replace(
        { pathname: router.pathname, query: { tab } },
        router.asPath.replace(/\?.*/, '') + `?tab=${tab}`
      );
    };
  }

  return (
    <>
      <Tabs>
        <TabItem isActive={tab === 'cover'} onClick={updateUrlParams('cover')}>
          <ImageIcon />
          Cover
        </TabItem>
        <TabItem isActive={tab === 'upload'} onClick={updateUrlParams('upload')}>
          <UploadIcon />
          Upload
        </TabItem>
        <TabItem isActive={tab === 'layout'} onClick={updateUrlParams('layout')}>
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
  border: 2px solid ${(props) => props.theme.colors.primary};
  border-radius: 4px;
`;

const TabItem = styled.button<{ isActive: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: 1rem 2rem;
  cursor: pointer;

  color: ${(props) =>
    props.isActive ? props.theme.colors.white : props.theme.colors.primary_dark};
  background-image: ${(props) =>
    props.isActive
      ? `linear-gradient(to right, ${props.theme.colors.primary} 0%, ${props.theme.colors.primary_light} 99%)`
      : 'none'};

  svg {
    margin-right: 0.6rem;
  }

  & + & {
    border-left: 1px solid ${(props) => props.theme.colors.primary};
  }
`;

export default AlbumTabs;
