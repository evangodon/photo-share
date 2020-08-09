import { useRef } from 'react';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import { Album } from '@/graphql/generated';
import { Options } from '@/components/interaction';
import Image from '@/components/Image';
import ContentEditable, { ContentEditableEvent } from '@/components/ContentEditable';
import { createSlug } from '@/utils';
import { AlbumDispatch } from '@/hooks';

type Props = {
  album: Pick<Album, 'title' | '_id' | 'coverPhoto'>;
  editable?: boolean;
  albumDispatch?: AlbumDispatch;
  handleInput?: (title: string) => void;
};

/**
 * Shows an album cover and title
 *
 * @todo: Add focus style to editable title
 */
const AlbumCard = ({ album, editable, albumDispatch }: Props) => {
  const text = useRef(album.title || 'Add a title');
  const router = useRouter();

  function handleChange(e: ContentEditableEvent) {
    text.current = e.target.value;

    albumDispatch({
      type: 'update:title',
      payload: { title: e.target.value.trim() },
    });
  }

  return (
    <Container>
      {editable ? (
        <AlbumCover>
          <Image src={album.coverPhoto} />
          <EditableHeader html={text.current} onChange={handleChange} tagName="h2" />
        </AlbumCover>
      ) : (
        <Link href={'/album/[album-slug]'} as={`/album/${album.title}-${album._id}`}>
          <AlbumCoverLink as="a">
            <Image src={album.coverPhoto} />
            <Header>{album.title}</Header>
            <AlbumOptions
              options={[
                {
                  label: 'Edit Album',
                  onClick: () => router.push(`/album/${createSlug(album)}/edit`),
                },
              ]}
            />
          </AlbumCoverLink>
        </Link>
      )}
    </Container>
  );
};

const AlbumOptions = styled(Options)`
  opacity: 0;
`;

export const Container = styled.figure`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 45.6rem;
  overflow: hidden;
  border-radius: var(--border-radius);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);

  &:hover ${AlbumOptions} {
    opacity: 1;
  }
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
    background-color: rgba(0, 0, 0, 0.1);
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
  left: 2rem;
  bottom: 2rem;
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

export default AlbumCard;
