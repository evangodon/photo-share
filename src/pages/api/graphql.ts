import { NextApiRequest, NextApiResponse } from 'next';
import { faunadb } from '@/lib/faundb';

const FAUNA_SECRET = process.env.FAUNADB_SECRET;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, variables } = req.body;
  const { data, errors } = await faunadb.query(query, { variables });

  return res.send({ data, errors });
};
