import styled from 'styled-components';
import Link from 'next/link';
import { Image } from '@/components';
import { Flex } from 'rebass';
import { Options } from '@/components/interactive';

type Props = {
  photos: any[];
  setPhotos?: any;
  editable?: boolean;
};

const ImageGrid = ({ photos, setPhotos, editable }: Props) => {
  if (photos.length === 0) {
    return <Flex justifyContent="center">No photos yet!</Flex>;
  }

  return (
    <ImageContainer>
      <>
        {photos.map((photo) => (
          <Link href="/photo/[photo-slug]" as={`/photo/${photo._id}`} key={photo._id}>
            <a>
              <Image src={photo.url ?? `https://source.unsplash.com/random`} />
            </a>
          </Link>
        ))}
        <span className="last-row" />
      </>
    </ImageContainer>
  );
};

const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: stretch;

  a {
    height: 40vh;
    display: inline-flex;
    margin: 2px;
    flex-grow: 1;
    transition: transform;
  }

  .last-row {
    flex-grow: 10;
  }
`;

const PhotoOptions = styled(Options)`
  opacity: 0;
`;

const DraggableImage = styled.div`
  position: relative;
  height: 40vh;
  display: inline-flex;
  margin: 2px;
  flex-grow: 1;
  transition: transform;

  &:hover ${PhotoOptions} {
    opacity: 1;
  }
`;

export default ImageGrid;
