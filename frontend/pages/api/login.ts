import type { NextApiRequest, NextApiResponse } from 'next';
import { apollo } from '../../utils/apollo';
import { gql } from '@apollo/client';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).send({ error: 'Invalid method', token: null });
  }

  const { username, password } = req.body;
  if (!(username && password)) {
    return res
      .status(400)
      .json({ error: 'No username or password specified', token: null });
  }

  let gqlRes;
  try {
    gqlRes = await apollo.query({
      query: gql`
        query ($credentials: UserLoginDto!) {
          login(credentials: $credentials)
        }
      `,
      variables: {
        credentials: { username, password }
      }
    });
  } catch (err) {
    return res.status(404).json({ error: 'User not found', token: null });
  }

  return res.status(200).json({ error: null, token: gqlRes.data.login });
}
