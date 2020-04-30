import got from 'got';

const FAUNA_SECRET = process.env.FAUNADB_SECRET;

if (!FAUNA_SECRET) {
  throw new Error('Missing fauna_db secret.');
}

const custom = got.extend({
  prefixUrl: 'https://graphql.fauna.com',
  responseType: 'json',
  headers: {
    Authorization: `Bearer ${FAUNA_SECRET}`,
  },
});

type FaunaDbError = { message: string }[];

type Response<T> =
  | { data: T; errors: null }
  | { data: null; errors: FaunaDbError };

export const faunadb = {
  query: async <Query>(query: string, { variables = {} } = {}) => {
    const response: Response<Query> = await custom
      .post('graphql', {
        body: JSON.stringify({
          query: query,
          variables,
        }),
      })
      .json();

    const { data, errors } = response;

    return { data, errors };
  },
};
