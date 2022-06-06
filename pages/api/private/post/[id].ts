import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'lib/prisma';
import { badRequest, methodNotAllowed, notAuthenticated } from 'util/api/util';
import auth from 'lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!(await auth(req.cookies.token))) return notAuthenticated(res);
  const postId = Number(req.query.id) as number;
  if (postId === Number.NaN) return badRequest(res);

  if (req.method == 'DELETE') {
    await prisma.post.delete({ where: { id: postId } });
    return res.status(200).json({ message: 'success' });
  }
  return methodNotAllowed(res);
}
