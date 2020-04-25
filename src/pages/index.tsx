import * as React from 'react';
import { NextPage, GetStaticProps } from 'next';
import Link from 'next/link';
import styled from 'styled-components';
import { H1 } from '@components/typography';
import { faunadb } from '@lib/faundb';

type Props = NextPage & {
  albums: { title: string; id: number }[];
  errors: any;
};

/**
 *
 * @todo: Add types
 */
const IndexPage = ({ albums, errors }: Props) => {
  if (errors) {
    return <span>{JSON.stringify(errors)}</span>;
  }

  return (
    <Container>
      <H1>Photo Share</H1>
      <ul>
        {albums.map((album: any) => (
          <AlbumItem key={album._id}>
            <Link href={`/album/${album.title}-${album._id}`}>
              <a>{album.title}</a>
            </Link>
          </AlbumItem>
        ))}
      </ul>
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async () => {
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

  if (errors) {
    return {
      props: {
        errors,
        albums: null,
      },
    };
  }

  return {
    props: { albums: data?.allAlbums?.data, errors: null },
  };
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 6rem;
`;

const AlbumItem = styled.li`
  margin-bottom: 1rem;
  font-size: var(--fs-large);
`;

export default IndexPage;
