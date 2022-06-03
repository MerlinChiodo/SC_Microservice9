import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'lib/prisma';
import { methodNotAllowed, notAuthenticated } from 'util/api/util';
import auth from 'lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!(await auth(req.cookies.token))) return notAuthenticated(res);
  const id = req.query.id as string | undefined;

  if (req.method === 'DELETE') {
    await prisma.housing.delete({ where: { id: Number(id) } });
    return res.status(200).json({ message: 'success' });
  }
  return methodNotAllowed(res);
}
