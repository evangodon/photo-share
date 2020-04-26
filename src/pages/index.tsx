import * as React from 'react';
import { NextPage, GetStaticProps } from 'next';
import Link from 'next/link';
import styled from 'styled-components';
import { H1 } from '@components/typography';
import AlbumCard from '@components/AlbumCard';
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
      <Albums>
        {albums.map((album: any) => (
          <AlbumCard album={album} key={album._id} />
        ))}
      </Albums>
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const query = /* GraphQL */ `
    query GetAlbums {
      allAlbums {
        data {
          title
          coverPhoto
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

const Albums = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 3.6rem;
`;

export default IndexPage;
