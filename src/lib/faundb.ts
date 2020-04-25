import got from 'got';
import { DocumentNode } from 'graphql';

const FAUNA_SECRET = 'fnADqFwk58ACEx9g9IuAb0WCSQNURcu8FtfPgcPo';

const custom = got.extend({
  prefixUrl: 'https://graphql.fauna.com',
  responseType: 'json',
  headers: {
    Authorization: `Bearer ${FAUNA_SECRET}`,
  },
});

/**
 * @todo: clean up the types here
 */
export const faunadb = {
  query: async (query: string, { variables = {} } = {}) => {
    const response: any = await custom
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
