import { NextApiRequest, NextApiResponse } from 'next';
import { AUTH_URL } from 'util/server';
import { fetchPostURLEncoded } from 'util/api/fetch';
import { notAuthenticated } from 'util/api/util';
import cookie from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = req.body;
  const response = await fetchPostURLEncoded(AUTH_URL + '/login', {
    username: username,
    password: password,
  });
  if (response.status != 200) return notAuthenticated(res);
  const data = await response.json();
  const user = { ...data.info, username: data.username, citizen_id: data.citizen_id };
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('token', data.user_session_token, {
      httpOnly: true,
      maxAge: 60 * 60,
      sameSite: 'strict',
      path: '/',
    })
  );
  return res.status(200).json(user);
}
