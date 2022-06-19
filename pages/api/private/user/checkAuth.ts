import { NextApiRequest, NextApiResponse } from 'next';
import { AUTH_URL } from 'util/server';
import { fetchPostURLEncoded } from 'util/api/fetch';
import { notAuthenticated } from 'util/api/util';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetchPostURLEncoded(AUTH_URL + '/verify', { code: req.cookies.token });
    return res.status(200).json(response);
  } catch (e) {
    return notAuthenticated(res);
  }
}
