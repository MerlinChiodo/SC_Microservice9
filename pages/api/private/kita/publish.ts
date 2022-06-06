import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'lib/prisma';
import { eventHandler } from 'util/rabbitmq';
import { customError, methodNotAllowed, notAuthenticated, success } from 'util/api/util';
import auth from 'lib/auth';

const eventData = {
  event_id: 9002,
  event_name: 'Refugee Kita Application',
  service_name: 'integration',
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!(await auth(req.cookies.token))) return notAuthenticated(res);

  if (req.method === 'POST') {
    const error = eventHandler({ ...eventData, ...req.body });
    if (error) return customError(res, error.code, error.message);
    return success(res);
  }
  return methodNotAllowed(res);
}
