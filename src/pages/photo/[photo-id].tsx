import { GetStaticPaths, InferGetStaticPropsType } from 'next';
import styled from 'styled-components';
import Link from 'next/link';
import { ChevronRight, ChevronLeft } from 'react-feather';
import { faunadb } from '@/lib/faundb';
import { FindPhotoById } from '@/graphql/queries';
import { FindPhotoByIdQuery } from '@/graphql/generated';
import { Button } from '@/components/interactive';
import { Image } from '@/components';
import { useAlbumPhotosOrder } from '@/hooks/useAlbumPhotosOrder';
import { createSlug } from '@/utils';
import { space, colors } from '@/css/theme';

const iconSize = 48;

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const PhotoPage = ({ photo }: PageProps) => {
  const { prevPhotoId, currentPhoto, nextPhotoId, photoOrder } = useAlbumPhotosOrder(
    photo
  );

  if (!currentPhoto) {
    return <span>Loading image...</span>;
  }

  return (
    <Container>
      <Top>
        <Button
          href={'/album/[album-id]/[album-title]'}
          as={`/album/${createSlug({
            _id: photo.album._id,
            title: photo.album.title,
          })}`}
          icon={ChevronLeft}
        >
          Back to album
        </Button>
      </Top>
      <Content>
        <ChevronContainer disabled={!Boolean(prevPhotoId)}>
          <Link href={'/photo/[photo-id]'} as={`/photo/${prevPhotoId}`} shallow>
            <a>
              <ChevronLeft size={iconSize} cursor="pointer" />
            </a>
          </Link>
        </ChevronContainer>
        <ImageContainer>
          <Image src={currentPhoto.url} options={{ height: 700 }} />
        </ImageContainer>
        <ChevronContainer disabled={!Boolean(nextPhotoId)}>
          <Link href={'/photo/[photo-id]'} as={`/photo/${nextPhotoId}`} shallow>
            <a>
              <ChevronRight size={iconSize} cursor="pointer" />
            </a>
          </Link>
        </ChevronContainer>
      </Content>
      <Bottom>
        {photoOrder.map((photo) => (
          <Circle active={photo._id === currentPhoto._id} />
        ))}
      </Bottom>
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
  flex-direction: column;
`;

const Top = styled.header`
  padding: ${space[3]} 0;
  margin-bottom: ${space[9]};
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: ${space[9]};
`;

const ImageContainer = styled.div`
  margin: 0 auto;
  max-width: 120rem;
  max-height: 60rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChevronContainer = styled.div<{ disabled: boolean }>`
  background-color: #fff;
  border-radius: var(--border-radius);
  user-select: none;

  a {
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: ${(props) => (props.disabled ? 0.3 : 1)};
    pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
  }
`;

const Bottom = styled.div`
  display: flex;
  justify-content: center;
`;

const Circle = styled.span<{ active: boolean }>`
  --size: 10px;
  height: var(--size);
  width: var(--size);
  border-radius: 50%;
  margin: 0 ${space[3]};
  background-color: ${(props) => (props.active ? colors.primary : colors.__grey_300)};
  transition: background-color 0.3s;
`;

export default PhotoPage;
