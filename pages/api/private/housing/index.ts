import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'lib/prisma';
import { validatorREST } from 'util/validators';
import { customError, methodNotAllowed, notAuthenticated } from 'util/api/util';
import auth from 'lib/auth';
import authEmployee from 'lib/auth/employee';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method == 'GET') {
    if (!(await authEmployee(req.cookies.token_employee))) return notAuthenticated(res);
    const housing = await prisma.housing.findMany({ include: { address: true } });
    return res.status(200).json(housing);
  }

  if (req.method == 'POST') {
    if (!(await auth(req.cookies.token))) return notAuthenticated(res);
    const error = validatorREST(req.body, 'newHousing');
    if (error) return customError(res, error.code, error.message);
    await prisma.housing.create({
      data: {
        ...req.body.housing,
        address: {
          connectOrCreate: {
            create: req.body.address,
            where: {
              house_number_street_city_code: {
                house_number: req.body.address.house_number,
                street: req.body.address.street,
                city_code: req.body.address.city_code,
              },
            },
          },
        },
      },
    });
    return res.status(200).json({ message: 'success' });
  }
  return methodNotAllowed(res);
}
