import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'lib/prisma';
import { customError, methodNotAllowed, notAuthenticated } from 'util/api/util';
import { validatorREST } from 'util/validators';
import auth from 'lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!(await auth(req.cookies.token))) return notAuthenticated(res);
  if (req.method === 'POST') {
    const error = validatorREST(req.body, 'register-refugee');
    if (error) return customError(res, error.code, error.message);
    if (req.body.document) {
      const refugee = await prisma.refugee.create({
        data: { ...req.body, document: Buffer.from(req.body.document) },
      });
      return res.status(200).json(refugee);
    }
    const refugee = await prisma.refugee.create({ data: req.body });
    return res.status(200).json(refugee);
  }

  if (req.method === 'GET') {
    const refugees = await prisma.refugee.findMany({
      where: { accepted: false, family_tag: null },
    });
    return res.status(200).json(refugees);
  }
  return methodNotAllowed(res);
}
