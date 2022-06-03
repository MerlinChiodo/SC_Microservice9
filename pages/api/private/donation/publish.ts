import { NextApiRequest, NextApiResponse } from 'next';
import { eventHandler } from 'util/rabbitmq';
import { methodNotAllowed, customError, success } from 'util/api/util';

const eventData = {
  event_id: 9003,
  event_name: 'Notify Incoming Donation',
  service_name: 'integration',
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const error = eventHandler({ ...eventData, ...req.body });
    if (error) return customError(res, error.code, error.message);
    return success(res);
  }
  return methodNotAllowed(res);
}
