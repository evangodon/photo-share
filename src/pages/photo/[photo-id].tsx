import styled from 'styled-components';
import withPageLayout from '@/components/layout/withPageLayout';
import { GetStaticPaths, InferGetStaticPropsType } from 'next';
import { faunadb } from '@/lib/faundb';
import { FindPhotoById } from '@/graphql/queries';
import { FindPhotoByIdQuery } from '@/graphql/generated';
import { Image } from '@/components';

const PhotoPage = ({ photo }: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log(photo);
  if (!photo) {
    return <span>Loading image...</span>;
  }

  // TODO: Need to query for the album and find out which photos are the next and previous
  return (
    <ImageContainer>
      <Image src={photo.url} options={{ width: 1200 }} />
    </ImageContainer>
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

const ImageContainer = styled.div`
  margin: 0 auto;
  max-width: 120rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default withPageLayout(PhotoPage);
