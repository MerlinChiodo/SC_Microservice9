import { NextApiRequest, NextApiResponse } from 'next';
import { methodNotAllowed } from 'util/api/util';

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2020-08-27',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // TODO employee auth
  if (req.method === 'GET') {
    const donations = await stripe.charges.list({ limit: 15 });
    return res.status(200).json(donations);
  }
  return methodNotAllowed(res);
}
