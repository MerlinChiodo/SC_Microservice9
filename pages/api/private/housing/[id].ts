import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'lib/prisma';
import { badRequest, methodNotAllowed, notAuthenticated } from 'util/api/util';
import auth from 'lib/auth/employee';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!(await auth(req.cookies.token_employee))) return notAuthenticated(res);
  const id = Number(req.query.id) as number;
  if (id === Number.NaN) return badRequest(res);

  if (req.method === 'DELETE') {
    await prisma.housing.delete({ where: { id: id } });
    return res.status(200).json({ message: 'success' });
  }
  return methodNotAllowed(res);
}
