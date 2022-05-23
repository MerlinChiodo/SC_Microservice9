import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'lib/prisma';

export default async function employeeHandler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      await prisma.employee
        .findMany()
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500).end('Internal Database Error'));
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
