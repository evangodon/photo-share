import { useRouter } from 'next/router';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { Flex } from 'rebass/styled-components';
import { Edit as EditIcon } from 'react-feather';
import Link from 'next/link';
import Image from '@/components/Image';
import { H2 } from '@/components/typography';
import { faunadb } from '@/lib/faundb';
import { ImageContainer, withPageLayout } from '@/components/layout';
import { FindAlbumById } from '@/graphql/queries';
import { getTitleFromSlug, getIdFromSlug } from '@/utils';
import { createPhotoDictionary } from '@/utils/photoData';
import { FindAlbumByIdQuery, GetAlbumsQuery } from '@/graphql/generated';
import { useAuthContext } from '@/context';
import { Button } from '@/components/interaction';

type Props = NextPage & { album: any };

const AlbumPage = ({ album }: Props) => {
  const router = useRouter();
  const slug = router.query['album-slug'] as string;
  const header = getTitleFromSlug(slug);
  const { user } = useAuthContext();

  console.log({ album });

  const photos = album.photos.data;

  if (Object.keys(photos).length === 0) {
    return <span>No Photos</span>;
  }

  return (
    <>
      <Flex mb={8} justifyContent="space-between">
        <H2>{header}</H2>
        {user?.isSuperUser && (
          <Button href={`/album/${slug}/edit`} icon={<EditIcon />}>
            Edit Album
          </Button>
        )}
      </Flex>
      <ImageContainer>
        <>
          {album.photoOrder
            .map((photoID: string) => {
              const src = album.photos.data[photoID]?.url;
              return (
                src && (
                  <Link href="/photo/photo-slug" key={photoID}>
                    <a>
                      <Image src={src} />
                    </a>
                  </Link>
                )
              );
            })
            .filter(Boolean)}
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
