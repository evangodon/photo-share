import styled from 'styled-components';
import Link from 'next/link';
import { Image } from '@/components';
import { Flex } from 'rebass';
import { Options } from '@/components/interactive';

type Props = {
  photos: any[];
};

const ImageGrid = ({ photos }: Props) => {
  if (photos.length === 0) {
    return <Flex justifyContent="center">No photos yet!</Flex>;
  }

  return (
    <ImageContainer>
      <>
        {photos.map((photo) => (
          <Link href="/photo/[photo-slug]" as={`/photo/${photo._id}`} key={photo._id}>
            <a>
              <Image
                src={photo.url ?? `https://source.unsplash.com/random`}
                options={{ height: 600 }}
              />
            </a>
          </Link>
        ))}
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

export default ImageGrid;
