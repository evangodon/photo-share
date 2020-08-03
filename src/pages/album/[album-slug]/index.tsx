import { useRouter } from 'next/router';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { Flex } from 'rebass/styled-components';
import Link from 'next/link';
import Image from '@/components/Image';
import { H1 } from '@/components/typography';
import { faunadb } from '@/lib/faundb';
import { ImageContainer, withPageLayout } from '@/components/layout';
import { FindAlbumById } from '@/graphql/queries';
import { getTitleFromSlug, getIdFromSlug } from '@/utils';
import { createPhotoTable } from '@/utils/photoData';
import { FindAlbumByIdQuery, GetAlbumsQuery } from '@/graphql/generated';
import { Button } from '@/components';

type Props = NextPage & { album: any };

const AlbumPage = ({ album }: Props) => {
  const router = useRouter();
  const slug = router.query['album-slug'] as string;
  const header = getTitleFromSlug(slug);

  const photos = album.photos.data;

  if (Object.keys(photos).length === 0) {
    return <span>No Photos</span>;
  }

  return (
    <>
      <Flex mb={8} justifyContent="space-between">
        <H1>{header}</H1>
        <Button variant="outlined" href={`/album/${slug}/edit`}>
          <a>Edit Album</a>
        </Button>
      </Flex>
      <ImageContainer>
        <>
          {album.photoOrder.map((photoID: string) => (
            <Link href="/photo/photo-slug" key={photoID}>
              <a>
                <Image src={album.photos.data[photoID].url} />
              </a>
            </Link>
          ))}
          <a className="last-row" />
        </>
      </ImageContainer>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params['album-slug'] as string;
  const albumID = getIdFromSlug(slug);

  const { data, errors } = await faunadb.query<FindAlbumByIdQuery>(FindAlbumById, {
    variables: { albumID },
  });

  if (errors) {
    throw new Error(errors[0].message);
  }

  const album = {
    ...data.findAlbumByID,
    photos: {
      data: createPhotoTable(data.findAlbumByID.photos.data),
    },
  };

  return {
    props: { album },
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

  const { data, errors } = await faunadb.query<GetAlbumsQuery>(query);

  const paths = data.allAlbums.data.map((album) => ({
    params: { ['album-slug']: `${album.title}-${album._id}` },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default withPageLayout(AlbumPage);
