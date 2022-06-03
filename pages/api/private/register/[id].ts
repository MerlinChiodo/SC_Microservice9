import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'lib/prisma';
import { methodNotAllowed, notAuthenticated, notFound, success } from 'util/api/util';
import auth from 'lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!(await auth(req.cookies.token))) return notAuthenticated(res);

  const refugeeId = req.query.id;
  if (req.method == 'DELETE') {
    const refugee = await prisma.refugee.delete({
      where: { id: Number(refugeeId) },
    });
    if (refugee) return success(res);
    return notFound(res);
  }
  return methodNotAllowed(res);
}
