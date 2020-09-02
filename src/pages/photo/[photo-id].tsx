import { GetStaticPaths, InferGetStaticPropsType } from 'next';
import styled from 'styled-components';
import Link from 'next/link';
import { ChevronRight, ChevronLeft } from 'react-feather';
import { faunadb } from '@/lib/faundb';
import { FindPhotoById } from '@/graphql/queries';
import { FindPhotoByIdQuery } from '@/graphql/generated';
import { Image } from '@/components';
import { useAlbumPhotosOrder } from '@/hooks/useAlbumPhotosOrder';

const iconSize = 48;

const PhotoPage = ({ photo }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { prevPhotoId, currentPhoto, nextPhotoId } = useAlbumPhotosOrder(photo);

  if (!currentPhoto) {
    return <span>Loading image...</span>;
  }

  return (
    <Container>
      <ChevronContainer disabled={!Boolean(prevPhotoId)}>
        <Link href={'/photo/[photo-id]'} as={`/photo/${prevPhotoId}`} shallow>
          <a>
            <ChevronLeft size={iconSize} cursor="pointer" />
          </a>
        </Link>
      </ChevronContainer>
      <ImageContainer>
        <Image src={currentPhoto.url} options={{ height: 900 }} />
      </ImageContainer>
      <ChevronContainer disabled={!Boolean(nextPhotoId)}>
        <Link href={'/photo/[photo-id]'} as={`/photo/${nextPhotoId}`} shallow>
          <a>
            <ChevronRight size={iconSize} cursor="pointer" />
          </a>
        </Link>
      </ChevronContainer>
    </Container>
  );
};

export const getStaticProps = async (context) => {
  const photoId = context.params['photo-id'] as string;
  const { data, errors } = await faunadb.query<FindPhotoByIdQuery>(FindPhotoById, {
    variables: { photoId },
  });

  if (errors) {
    throw new Error(errors[0].message);
  }

  return {
    props: { photo: data.findPhotoByID },
  };
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: true,
});

const Container = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
`;

const ImageContainer = styled.div`
  margin: 0 auto;
  max-width: 120rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const ChevronContainer = styled.div<{ disabled: boolean }>`
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
`;

export default PhotoPage;
