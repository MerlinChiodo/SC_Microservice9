import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import { success } from 'util/api/util';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('token_employee', '', {
      httpOnly: true,
      maxAge: -1,
      sameSite: 'strict',
      path: '/',
    })
  );
  return success(res);
}
