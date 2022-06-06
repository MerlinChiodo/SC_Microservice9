import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'lib/prisma';
import { customError, methodNotAllowed, success } from 'util/api/util';
import { validatorREST } from 'util/validators';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const error = validatorREST(req.body, 'register-refugee');
    if (error) return customError(res, error.code, error.message);
    await prisma.refugee.create({ data: req.body });
    return success(res);
  }
  return methodNotAllowed(res);
}
