import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'lib/prisma';
import { customError, methodNotAllowed, success } from 'util/api/util';
import { validatorREST } from 'util/validators';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const error = validatorREST(req.body, 'register-refugee');
    if (error) return customError(res, error.code, error.message);
    const refugee = await prisma.refugee.create({ data: req.body });
    return res.status(200).json(refugee);
  }

  if (req.method === 'GET') {
    const refugees = await prisma.refugee.findMany({ where: { accepted: false } });
    return res.status(200).json(refugees);
  }
  return methodNotAllowed(res);
}
