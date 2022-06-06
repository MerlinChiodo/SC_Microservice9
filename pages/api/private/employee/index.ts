import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'lib/prisma';
import { methodNotAllowed, notAuthenticated } from 'util/api/util';
import auth from 'lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!(await auth(req.cookies.token))) return notAuthenticated(res);
  if (req.method === 'GET') {
    const employees = await prisma.employee.findMany();
    return res.status(200).json(employees);
  }
  return methodNotAllowed(res);
}
