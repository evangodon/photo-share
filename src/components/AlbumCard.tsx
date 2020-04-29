import styled from 'styled-components';
import Link from 'next/link';
import Image from '@/components/Image';

type Props = {
  album: any;
};

const AlbumCard = ({ album }: Props) => (
  <Container>
    <>
      <Link href={`/album/${album.title}-${album._id}`}>
        <AlbumLink>
          <Image src={album.coverPhoto} />
          <Header>{album.title}</Header>
        </AlbumLink>
      </Link>
      <Content></Content>
    </>
  </Container>
);

const Container = styled.figure`
  display: flex;
  flex-direction: column;
  min-width: 30rem;
  overflow: hidden;
  border-radius: var(--border-radius);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
`;

const AlbumLink = styled.a`
  max-width: 40rem;
  height: 30rem;
  display: inline-block;
  cursor: pointer;
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

  &:hover:before {
    background-color: transparent;
  }

  img {
    object-fit: cover;
    height: 100%;
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
