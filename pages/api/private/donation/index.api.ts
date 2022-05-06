import { NextApiRequest, NextApiResponse } from 'next';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { DonationSchema } from './jsonSchema';
import { prisma } from '../../../../lib/prisma';
import donationEventHandler from './event';

export default async function donateHandler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const ajv = new Ajv({ allErrors: true });
  addFormats(ajv);

  switch (method) {
    case 'POST':
      // Validation JSON Schemas REST API Call
      if (!ajv.validate(DonationSchema, req.body)) {
        res.status(400).end('Invalid Donation Data');
        break;
      }

      const db = {
        amount: req.body.amount,
        citizen_id: req.body.citizen_id,
      };

      // create donation in db
      await prisma.donation
        .create({ data: db })
        .then((donation) => {
          // Send Event via RabbitMQ if id_citizens exists
          if (req.body.citizen_id) {
            donationEventHandler({
              event_id: 9003,
              event_name: 'Notify Incoming Donation',
              service_name: 'integration',
              ...req.body,
            })
              .then(() => res.status(200).json(donation))
              .catch((err) => {
                res.status(err.code).end(err.message);
              });
          } else {
            res.status(200).json(donation);
          }
        })
        .catch(() => {
          res.status(500).end('Internal Database Server Error');
        });
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
