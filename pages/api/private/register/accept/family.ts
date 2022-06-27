import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'lib/prisma';
import {
  badRequest,
  customError,
  methodNotAllowed,
  notAuthenticated,
  success,
} from 'util/api/util';
import { eventHandler } from 'util/rabbitmq';
import auth from 'lib/auth';

const eventData = {
  event_id: 9001,
  event_name: 'Register New Refugee Family',
  service_name: 'integration',
  date: new Date().toISOString().slice(0, 19),
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!(await auth(req.cookies.token))) return notAuthenticated(res);
  if (req.method === 'POST') {
    if (!req.body.family_tag) return badRequest(res);
    const event = {
      ...eventData,
      parents: req.body.parents,
      children: req.body.children,
    };
    const error = eventHandler(event);
    if (error) return customError(res, error.code, error.message);

    await prisma.refugee.updateMany({
      where: { family_tag: req.body.family_tag },
      data: { accepted: true },
    });
    return success(res);
  }
  return methodNotAllowed(res);
}
