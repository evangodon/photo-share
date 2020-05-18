import styled from 'styled-components';
import Link from 'next/link';
import { Image } from '@/components';

type Props = {
  photos: any[];
  editable?: boolean;
};

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

const ImageGrid = ({ photos, editable }: Props) => {
  return (
    <ImageContainer>
      <>
        {photos.map(editable ? photosWithLinks : photosWithoutLinks)}
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
