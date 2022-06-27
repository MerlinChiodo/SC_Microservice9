import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'lib/prisma';
import { badRequest, methodNotAllowed, notAuthenticated, notFound, success } from 'util/api/util';
import auth from 'lib/auth/employee';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!(await auth(req.cookies.token_employee))) return notAuthenticated(res);
  const refugeeId = Number(req.query.id) as number;
  if (refugeeId === Number.NaN) return badRequest(res);

  if (req.method == 'DELETE') {
    const refugee = await prisma.refugee.delete({ where: { id: refugeeId } });
    if (refugee) return success(res);
    return notFound(res);
  }
  return methodNotAllowed(res);
}
