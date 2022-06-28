import { NextApiRequest, NextApiResponse } from 'next';
import auth from 'lib/auth/employee';
import { eventHandler } from 'util/rabbitmq';
import { methodNotAllowed, notAuthenticated, customError, success } from 'util/api/util';

const eventData = {
  event_id: 9006,
  event_name: 'Delete My Service',
  service_name: 'Integration',
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!(await auth(req.cookies.token_employee))) return notAuthenticated(res);

  if (req.method === 'POST') {
    const error = eventHandler({ ...eventData, ...req.body });
    if (error) return customError(res, error.code, error.message);
    return success(res);
  }
  return methodNotAllowed(res);
}
