import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'lib/prisma';
import { methodNotAllowed, notAuthenticated } from 'util/api/util';
import auth from 'lib/auth/employee';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!(await auth(req.cookies.token_employee))) return notAuthenticated(res);
  if (req.method === 'GET') {
    const refugees = await prisma.refugee.findMany({
      orderBy: [
        {
          family_tag: 'desc',
        },
        {
          date_of_birth: 'asc',
        },
      ],
      where: { accepted: false, family_tag: { not: null } },
    });
    return res.status(200).json(refugees);
  }
  return methodNotAllowed(res);
}
