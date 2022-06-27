import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'lib/prisma';
import { badRequest, customError, notAuthenticated, notFound } from 'util/api/util';
import { eventHandler } from 'util/rabbitmq';
import auth from 'lib/auth/employee';

const eventData = {
  event_id: 9000,
  event_name: 'Register New Refugee',
  service_name: 'integration',
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!(await auth(req.cookies.token_employee))) return notAuthenticated(res);
  const refugeeId = Number(req.query.id) as number;
  if (refugeeId === Number.NaN) return badRequest(res);


  const refugee = await prisma.refugee.findUnique({ where: { id: refugeeId } });

  if (refugee) {
    await prisma.refugee.update({ where: { id: refugee.id }, data: { accepted: true } });

    const event = {
      ...eventData,
      refugee: {
        firstname: refugee.firstname,
        lastname: refugee.lastname,
        date_of_birth: refugee.date_of_birth.toISOString(),
        email: refugee.email,
      },
    };

    const error = eventHandler(event);
    if (error) return customError(res, error.code, error.message);
    return res.status(200).json({ message: 'success' });
  }
  return notFound(res);
}
