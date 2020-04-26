import styled from 'styled-components';
import { useRouter } from 'next/router';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import Image from '@components/Image';
import { H1 } from '@components/typography';
import { faunadb } from '@lib/faundb';

type Props = NextPage & { album: any };

const AlbumPage = ({ album }: Props) => {
  const router = useRouter();
  const header = router.query['album-slug'];

  const photos = album.photos.data;

  return (
    <>
      <H1>{header}</H1>
      <ImageContainer>
        {photos.map((photo, index) => (
          <Link href="/photo/photo-slug" key={photo._id}>
            <a>
              <Image src={`https://source.unsplash.com/random?${index}`} />
            </a>
          </Link>
        ))}
      </ImageContainer>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const albumID = (context.params['album-slug'] as string).split('-').pop();

  const query = /* GraphQL */ `
    query GetAlbum {
      findAlbumByID(id: ${albumID}) {
        title
        photos {
          data {
            _id
            url
          }
        }
      }
    }
  `;

  const { data, errors } = await faunadb.query(query);

  if (errors) {
    throw new Error(errors[0].message);
  }

  return {
    props: { album: data.findAlbumByID },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const query = /* GraphQL */ `
    query GetAlbums {
      allAlbums {
        data {
          title
          _id
        }
      }
    }
  `;

  const { data, errors } = await faunadb.query(query);

  const paths = data.allAlbums.data.map((album) => ({
    params: { ['album-slug']: `${album.title}-${album._id}` },
  }));

  return {
    paths,
    fallback: false,
  };
};

const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default AlbumPage;
