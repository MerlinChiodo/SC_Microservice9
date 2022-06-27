import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'lib/prisma';
import { customError, methodNotAllowed, notAuthenticated, notFound, success } from 'util/api/util';
import auth from 'lib/auth/employee';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!(await auth(req.cookies.token_employee))) return notAuthenticated(res);

  if (req.method === 'PUT') {
    const r_id = req.body.refugee_id as number | undefined;
    const h_id = req.body.housing_id as number | undefined;

    const housing = await prisma.housing.findUnique({ where: { id: h_id } });
    if (!housing) return notFound(res);

    if (housing.people_assigned + 1 > housing.people_limit)
      return customError(res, 400, 'Too many people assigned');

    const refugee = await prisma.refugee.findUnique({ where: { id: r_id } });
    if (!refugee) return notFound(res);

    await prisma.refugee.update({
      where: { id: refugee.id },
      data: { housing_id: housing.id },
    });

    await prisma.housing.update({
      where: { id: housing.id },
      data: { people_assigned: housing.people_assigned + 1 },
    });

    return success(res);
  }
  return methodNotAllowed(res);
}
