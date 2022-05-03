import { NextApiRequest, NextApiResponse } from 'next';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { prisma } from '../../../../lib/prisma';
import { KitaSchema } from './jsonSchema';
import kitaEventHandler from './event';

export default function kitaHandler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const ajv = new Ajv({ allErrors: true });
  addFormats(ajv);

  switch (method) {
    case 'POST':
      if (!ajv.validate(KitaSchema, req.body)) {
        res.status(400).end('Invalid Kita Application');
        return;
      }

      const event = {
        event_id: 9002,
        event_name: 'Refugee Kita Application',
        service_name: 'integration',
        care_time: req.body.care_time,
        child: { citizen_id: req.body.child.citizen_id },
        parent: { citizen_id: req.body.parent.citizen_id },
      };

      // Send Event via RabbitMQ
      kitaEventHandler(event)
        .then(() => {
          // create record about application in db
          prisma.kitaApplication
            .create({ data: {date: req.body.date, refugee_id: req.body.child.refugee_id,}})
            .then((kita) => res.status(200).json(kita))
            .catch(() => res.status(500).end('Internal Database Server Error'));
        })
        .catch((err) => {
          res.status(err.code).end(err.message);
        });
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
