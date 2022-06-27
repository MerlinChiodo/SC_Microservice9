import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'lib/prisma';
import { methodNotAllowed, notAuthenticated } from 'util/api/util';
import auth from 'lib/auth/employee';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!(await auth(req.cookies.token_employee))) return notAuthenticated(res);

  if (req.method == 'GET') {
    const drafts = await prisma.post.findMany({
      where: { published: false },
      include: { employee: true },
    });
    return res.status(200).json(drafts);
  }
  return methodNotAllowed(res);
}
