import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import styled from 'styled-components';
import { FolderPlus as FolderPlusIcon } from 'react-feather';
import { AlbumCard } from '@/components/album';
import { H2 } from '@/components/typography';
import { Button } from '@/components/interactive';
import { faunadb } from '@/lib/faundb';
import { useAuthContext } from '@/context';
import { GetAlbumsHomeQuery } from '@/graphql/generated';

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

/**
 * The Home Page
 */
const IndexPage = ({ albums, errors }: PageProps) => {
  const { user } = useAuthContext();

  if (errors) {
    return <span>{JSON.stringify(errors)}</span>;
  }

  return (
    <>
      <Container>
        <ActionBar>
          <H2>Albums</H2>
          {user?.isSuperUser && (
            <Link href="/album/create" passHref>
              <Button variant="default" icon={FolderPlusIcon}>
                New Album
              </Button>
            </Link>
          )}
        </ActionBar>
        <Albums>
          {albums.length === 0 && <span>No albums have been created 😓</span>}
          {albums.map((album) => (
            <AlbumCard key={album._id} album={album} user={user} />
          ))}
        </Albums>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const query = /* GraphQL */ `
    query GetAlbumsHome {
      allAlbums {
        data {
          title
          coverPhoto
          _id
        }
      }
    }
  `;

  const { data, errors } = await faunadb.query<GetAlbumsHomeQuery>(query);

  if (errors) {
    return {
      props: {
        errors,
        albums: null,
      },
    };
  }

  return {
    props: { albums: data.allAlbums.data, errors: null },
  };
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: 0 auto;
  max-width: var(--app-max-width);
`;

const Albums = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 3.6rem;
`;

const ActionBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3rem;
`;

export default IndexPage;
