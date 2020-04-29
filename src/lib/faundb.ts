import got from 'got';

const FAUNA_SECRET = process.env.FAUNADB_SECRET;

const custom = got.extend({
  prefixUrl: 'https://graphql.fauna.com',
  responseType: 'json',
  headers: {
    Authorization: `Bearer ${FAUNA_SECRET}`,
  },
});

type FaunaDbError = { message: string }[];
type FailedRequest = { data: null; errors: FaunaDbError };

export const faunadb = {
  query: async <Query>(query: string, { variables = {} } = {}) => {
    const response: { data: Query; errors: null } | FailedRequest = await custom
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
