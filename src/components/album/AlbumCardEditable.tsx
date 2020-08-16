import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Flex } from 'rebass';
import { Image as ImageIcon } from 'react-feather';
import { Album } from '@/graphql/generated';
import Image from '@/components/Image';
import ContentEditable, { ContentEditableEvent } from '@/components/ContentEditable';
import { AlbumDispatch } from '@/hooks';
import { User } from '@/types/index';
import {
  Container,
  CoverImagePlaceholder,
  EditableHeader,
  AlbumCover,
  ImageContainer,
  HelpItem,
} from './AlbumCard.styles';

type Props = {
  album: Pick<Album, 'title' | '_id' | 'coverPhoto'>;
  albumDispatch?: AlbumDispatch;
  handleInput?: (title: string) => void;
  user?: User;
};

const titlePlaceholder = 'Type your title here...';

/**
 * Shows an album cover and title
 *
 */
export const AlbumCardEditable = ({ album, albumDispatch, user }: Props) => {
  function handleChange(e: ContentEditableEvent) {
    albumDispatch({
      type: 'update:title',
      payload: { title: e.target.value },
    });
  }

  return (
    <Container>
      <AlbumCover>
        <ImageContainer>
          {album.coverPhoto ? (
            <Image src={album.coverPhoto} options={{ height: 300 }} />
          ) : (
            <CoverImagePlaceholder>
              <HelpItem flexDirection="column">
                <ImageIcon size="36" />
                Pick a cover image from the layout tab.
              </HelpItem>
            </CoverImagePlaceholder>
          )}
        </ImageContainer>
        <Flex alignItems="center" p={3}>
          <EditableHeader
            value={album.title}
            placeholder={titlePlaceholder}
            onChange={handleChange}
          />
        </Flex>
      </AlbumCover>
    </Container>
  );
};
