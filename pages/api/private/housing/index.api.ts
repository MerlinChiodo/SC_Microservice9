import { NextApiRequest, NextApiResponse } from 'next';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { HousingDataSchema } from './jsonSchema';
import { prisma } from '../../../../lib/prisma';

export default async function housingHandler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const ajv = new Ajv({ allErrors: true });
  addFormats(ajv);

  switch (method) {
    case 'GET':
      // TODO check for loggedIn Employee
      await prisma.housing
        .findMany()
        .then((housing) => res.status(200).json(housing))
        .catch(() => res.status(500).end('Internal Database Server Error'));
    case 'POST':
      // Validation JSON Schema
      if (!ajv.validate(HousingDataSchema, req.body)) {
        res.status(400).end('Invalid Housing Data, please check JSON Schema');
        return;
      }
      // create new housing
      await prisma.housing
        .create({
          data: {
            ...req.body.housing,
            address: {
              create: {
                ...req.body.address,
              },
            },
          },
        })
        .then((housing) => res.status(200).json(housing))
        .catch(() => res.status(500).end('Internal Database Server Error'));
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
