import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'lib/prisma';
import { customError, notAuthenticated, notFound } from 'util/api/util';
import { eventHandler } from 'util/rabbitmq';
import auth from 'lib/auth';

const eventData = {
  event_id: 9000,
  event_name: 'Register New Refugee',
  service_name: 'integration',
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!(await auth(req.cookies.token))) return notAuthenticated(res);
  const refugeeId = req.query.id as string | undefined;

  const refugee = await prisma.refugee.findUnique({ where: { id: Number(refugeeId) } });

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
