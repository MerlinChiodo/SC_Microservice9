import { NextApiRequest, NextApiResponse } from 'next';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { HousingDataSchema } from './jsonSchema';
import { prisma } from '../../../../lib/prisma';
import auth from '../../../../lib/auth';

export default async function housingHandler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const ajv = new Ajv({ allErrors: true });
  addFormats(ajv);

  req.cookies.token = 'test';
  if (!auth(req.cookies.token)) {
    res.status(403).end(`No Authorization`);
    return;
  }

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
      // check if address already in db
      let address;
      try {
        address = await prisma.address.findFirst({
          where: {
            AND: [
              { house_number: req.body.address.house_number },
              { street: req.body.address.street },
              { city_code: req.body.address.city_code },
            ],
          },
        });
      } catch (err) {
        res.status(500).end('Interal Database Server Error');
        break;
      }
      // set to zero if not set in request
      if (!req.body.housing.people_assigned) {
        req.body.housing.people_assigned = 0;
      }
      if (address) {
        // create new housing
        await prisma.housing
          .create({
            data: {
              ...req.body.housing,
              address_id: address.id,
            },
          })
          .then((housing) => res.status(200).json(housing))
          .catch(() => res.status(500).end('Internal Database Server Error'));
      } else {
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
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
