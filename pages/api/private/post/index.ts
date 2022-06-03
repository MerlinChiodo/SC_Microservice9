import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'lib/prisma';
import { methodNotAllowed, customError } from 'util/api/util';
import { validatorREST } from 'util/validators';
import { notAuthenticated, success } from 'util/api/util';
import auth from 'lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!(await auth(req.cookies.token))) return notAuthenticated(res);

  if (req.method == 'POST') {
    const error = validatorREST(req.body, 'newPost');
    if (error) return customError(res, error.code, error.message);

    await prisma.post.create({ data: req.body });
    return success(res);
  }
  return methodNotAllowed(res);
}
