import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'lib/prisma';
import { methodNotAllowed, isEmpty, notFound } from 'util/api/util';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const qr_code = req.query.qr_code as string | undefined;
    if (isEmpty(qr_code)) return notFound(res);

    const result = await prisma.refugee.findUnique({
      where: { qr_code: qr_code },
    });
    if (result) return res.status(200).json({ status: true });
    return res.status(200).json({ status: false });
  }
  return methodNotAllowed(res);
}
