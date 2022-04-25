import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function refugeeHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case 'GET':
      const result = await prisma.refugee.findFirst({
        where: { qr_code: typeof id === 'string' ? id : undefined },
      });
      if (!result) {
        res.status(200).json({ status: false });
      } else {
        res.status(200).json({ status: true });
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
