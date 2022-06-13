import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'lib/prisma';
import { methodNotAllowed } from 'util/api/util';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const refugees = await prisma.refugee.findMany({
      orderBy: [
        {
          family_tag: 'desc',
        },
        {
          firstname: 'desc',
        },
      ],
      where: { accepted: true, housing: null},
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        family_tag: true,
      },
    });
    return res.status(200).json(refugees);
  }
  return methodNotAllowed(res);
}
