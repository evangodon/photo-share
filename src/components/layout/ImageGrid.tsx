import styled from 'styled-components';
import Link from 'next/link';
import { Image } from '@/components';
import { Flex } from 'rebass';

type Props = {
  photos: any[];
  editable?: boolean;
};

const ImageGrid = ({ photos, editable }: Props) => {
  if (photos.length === 0) {
    return <Flex justifyContent="center">No photos yet!</Flex>;
  }

  const photosWithoutLinks = (photo) => (
    <div key={photo._id}>
      <Image src={photo.url ?? `https://source.unsplash.com/random`} />
    </div>
  );

  const photosWithLinks = (photo) => (
    <Link href="/photo/photo-slug" key={photo._id}>
      <a>
        <Image src={photo.url ?? `https://source.unsplash.com/random`} />
      </a>
    </Link>
  );

  return (
    <ImageContainer>
      <>
        {photos.map(editable ? photosWithoutLinks : photosWithLinks)}
        <a className="last-row" />
      </>
    </ImageContainer>
  );
};

const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: stretch;

  a,
  div {
    height: 40vh;
    display: inline-flex;
    margin: 2px;
    flex-grow: 1;
  }

  .last-row {
    flex-grow: 10;
  }
`;

export default ImageGrid;
