import { NextPage, GetStaticProps } from 'next';
import Link from 'next/link';
import styled from 'styled-components';
import { providers } from 'next-auth/client';
import { withPageLayout } from '@/components/layout';
import { Header, AlbumCard } from '@/components';
import { H2 } from '@/components/typography';
import { Button } from '@/components';
import { faunadb } from '@/lib/faundb';
import { GetAlbumsHomeQuery } from '@/graphql/generated';
import { Plus as PlusIcon } from 'react-feather';

type Props = NextPage & {
  albums: GetAlbumsHomeQuery['allAlbums']['data'];
  errors: any;
  authProviders: any;
};

/**
 * The Home Page
 */
const IndexPage = ({ albums, errors, authProviders }: Props) => {
  if (errors) {
    return <span>{JSON.stringify(errors)}</span>;
  }

  return (
    <>
      <Container>
        <ActionBar>
          <H2>Albums</H2>
          <Link href="/album/create" passHref>
            <Button variant="outlined">
              <PlusIcon />
              New Album
            </Button>
          </Link>
        </ActionBar>
        <Albums>
          {albums.map((album) => (
            <AlbumCard album={album} key={album._id} />
          ))}
        </Albums>
      </Container>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
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

export default withPageLayout(IndexPage);
