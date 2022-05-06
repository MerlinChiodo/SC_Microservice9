import { NextApiRequest, NextApiResponse } from 'next';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { prisma } from '../../../../lib/prisma';
import { RegisterRefugeeSchema } from './jsonSchema';
import { generateQRCode, assignHousing } from './registerHelper';
import { registerRefugeeEventHandler } from './event';

export default function registerHandler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const ajv = new Ajv({ allErrors: true });
  addFormats(ajv);

  switch (method) {
    case 'POST':
      if (!ajv.validate(RegisterRefugeeSchema, req.body)) {
        res.status(400).end('Invalid Register Data');
        return;
      }
      const event = {
        event_id: 9000,
        event_name: 'Register New Refugee',
        service_name: 'integration',
        refugee: {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          date_of_birth: req.body.date_of_birth,
          email: req.body.email,
        },
      };
      const qr_code = generateQRCode(req.body.firstname, req.body.lastname);
      let housing_id: number;
      assignHousing(1)
        .then((id) => {
          housing_id = id;
          prisma.refugee
            .create({
              data: { ...req.body, qr_code: qr_code, housing_id: housing_id },
            })
            .then((refugee) => {
              registerRefugeeEventHandler(event)
                .then(() => res.status(200).json({ refugee: refugee, error: false }))
                .catch((err) =>
                  res
                    .status(200)
                    .json({ refugee: refugee, error: true, code: err.code, message: err.message })
                );
            })
            .catch((err) => {
              res.status(500).end('Error creating refugee');
            });
        })
        .catch((err) => {
          res.status(500).end(err);
        });
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
