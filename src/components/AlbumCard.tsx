import { useRef } from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import { Album } from '@/graphql/generated';
import Image from '@/components/Image';
import { createClient } from 'urql';
import ContentEditable, {
  ContentEditableEvent,
} from '@/components/ContentEditable';

type Props = {
  album: Pick<Album, 'title' | '_id' | 'coverPhoto'>;
  editable?: boolean;
  handleInput?: (title: string) => void;
};

/**
 * Shows an album cover and title
 *
 * @todo: Add focus style to editable title
 */
const AlbumCard = ({ album, editable, handleInput }: Props) => {
  const text = useRef('');

  function handleChange(e: ContentEditableEvent) {
    text.current = e.target.value;
    handleInput(e.target.value);
  }

  return (
    <Container>
      {editable ? (
        <AlbumCover>
          <Image src={album.coverPhoto} />
          <EditableHeader
            html={`${album.title}`}
            onChange={handleChange}
            tagName="h2"
          />
        </AlbumCover>
      ) : (
        <Link href={`/album/${album.title}-${album._id}`}>
          <AlbumCoverLink as="a">
            <Image src={album.coverPhoto} />
            <Header>{album.title}</Header>
          </AlbumCoverLink>
        </Link>
      )}
    </Container>
  );
};

export const Container = styled.figure`
  display: flex;
  flex-direction: column;
  min-width: 45.6rem;
  overflow: hidden;
  border-radius: var(--border-radius);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
`;

const AlbumCover = styled.div`
  height: 30rem;
  display: inline-block;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    transition: background-color 0.2s ease;
  }
`;

const AlbumCoverLink = styled(AlbumCover)`
  cursor: pointer;

  &:hover:before {
    background-color: transparent;
  }
`;

const headerStyles = css`
  color: #fff;
  text-shadow: 1px 1px 2px #000;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  min-width: 2rem;
`;

const EditableHeader = styled(ContentEditable)`
  ${headerStyles};

  &:focus {
  }
`;

const Header = styled.h2`
  ${headerStyles};
`;

const Content = styled.div``;

export default AlbumCard;
