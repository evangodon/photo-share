import { useRouter } from 'next/router';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { Flex } from 'rebass/styled-components';
import { Edit as EditIcon } from 'react-feather';
import Link from 'next/link';
import Image from '@/components/Image';
import { Button } from '@/components/interactive';
import { H2 } from '@/components/typography';
import { faunadb } from '@/lib/faundb';
import { ImageContainer, withPageLayout } from '@/components/layout';
import { FindAlbumById } from '@/graphql/queries';
import { makeUrlFriendly } from '@/utils';
import { FindAlbumByIdQuery, GetAlbumsQuery } from '@/graphql/generated';
import { useAuthContext } from '@/context';

type Props = NextPage & { album: any };

const AlbumPage = ({ album }: Props) => {
  const router = useRouter();
  const albumId = router.query['album-id'] as string;
  const header = router.query['album-title'] as string;
  const { user } = useAuthContext();

  const photos = album.photos.data;

  if (Object.keys(photos).length === 0) {
    return <span>No Photos</span>;
  }

  return (
    <>
      <Flex mb={8} justifyContent="space-between">
        <H2>{header}</H2>
        {user?.isSuperUser && (
          <Button
            href={`/album/[album-id]/edit`}
            as={`/album/${albumId}/edit`}
            icon={EditIcon}
          >
            Edit Album
          </Button>
        )}
      </Flex>
      <ImageContainer>
        <>
          {album.photoOrder
            .map((photoId: string) => {
              const photo = album.photos.data.find((photo) => photo.photoId === photoId);
              const { url: src } = photo;
              return (
                src && (
                  <Link href="/photo/[photo-id]" as={`/photo/${photo._id}`} key={photoId}>
                    <a>
                      <Image cursor="pointer" src={src} options={{ height: 600 }} />
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
  const albumId = context.params['album-id'] as string;

  const { data, errors } = await faunadb.query<FindAlbumByIdQuery>(FindAlbumById, {
    variables: { albumId },
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
    params: { ['album-id']: album._id, ['album-title']: makeUrlFriendly(album.title) },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default AlbumPage;
