import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'lib/prisma';
import { methodNotAllowed, notAuthenticated } from 'util/api/util';
import auth from 'lib/auth/employee';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!(await auth(req.cookies.token_employee))) return notAuthenticated(res);
  if (req.method === 'GET') {
    const email = req.query.email as string | undefined;
    const employee = await prisma.employee.findUnique({ where: { email: email } });
    return res.status(200).json(employee);
  }
  return methodNotAllowed(res);
}
