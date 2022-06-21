import { NextApiRequest, NextApiResponse } from 'next';
import { AUTH_URL } from 'util/server';
import { fetchPostURLEncoded } from 'util/api/fetch';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const response = await fetchPostURLEncoded(AUTH_URL + '/verify', { code: req.cookies.token });
  if (response.status != 200) return res.status(200).json({ verified: false, message: 'invalid token' });
  const data = await response.json();
  return res.status(200).json({ verified: true, user: data });
}
