import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function refugeeHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { qr_code },
    method,
  } = req;

  if (typeof qr_code !== 'string') {
    res.status(400).json({ statusCode: 400, message: 'Invalid QR code' });
    return;
  }

  switch (method) {
    case 'GET':
      const result = await prisma.refugee.findFirst({
        where: { qr_code: qr_code },
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
