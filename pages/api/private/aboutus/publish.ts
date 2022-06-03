import { NextApiRequest, NextApiResponse } from 'next';
import auth from 'lib/auth';
import { eventHandler } from 'util/rabbitmq';
import { methodNotAllowed, notAuthenticated, customError, success } from 'util/api/util';

const eventData = {
  event_id: 9005,
  event_name: 'Change About Us',
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
