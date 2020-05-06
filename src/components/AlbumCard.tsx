import styled from 'styled-components';
import Link from 'next/link';
import Image from '@/components/Image';
import { Album } from '@/graphql/generated';

type Props = {
  album: Pick<Album, 'title' | '_id' | 'coverPhoto'>;
  editable?: boolean;
};

const AlbumCard = ({ album, editable }: Props) => (
  <Container>
    {editable ? (
      <AlbumCover>
        <Image src={album.coverPhoto} />
        <Header>{album.title}</Header>
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

const Header = styled.h2`
  color: #fff;
  text-shadow: 1px 1px 2px #000;
  position: absolute;
  bottom: 2rem;
  left: 2rem;
`;

const Content = styled.div``;

export default AlbumCard;
