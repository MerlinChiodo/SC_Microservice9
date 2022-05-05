import { NextApiRequest, NextApiResponse } from 'next';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { HousingPUTSchema } from './jsonSchema';
import { prisma } from '../../../../lib/prisma';

export default async function housingHandler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  let tmp = req.query.id;
  if (typeof tmp !== 'string') {
    res.status(400).json({ statusCode: 400, message: 'Wrong Query Input Type' });
    return;
  }
  const id = parseInt(tmp);

  const ajv = new Ajv({ allErrors: true });
  addFormats(ajv);

  switch (method) {
    case 'GET':
      // TODO check for loggedIn Employee
      await prisma.housing
        .findUnique({ where: { id: id } })
        .then((housing) => {
          if (housing) {
            res.status(200).json(housing);
          } else {
            res.status(400).end('Invalid Housing ID');
          }
        })
        .catch(() => res.status(500).end('Internal Database Server Error'));
      break;

    case 'PUT':
      // TODO check for loggedIn Employee

      // Validation JSON Schema
      if (!ajv.validate(HousingPUTSchema, req.body)) {
        res.status(400).end('Invalid Housing Data, please check JSON Schema');
        break;
      }
      await prisma.housing
        .update({
          where: {
            id: id,
          },
          data: {
            ...req.body,
          },
        })
        .then((housing) => res.status(200).json(housing))
        .catch(() => res.status(500).end('Internal Database Server'));
      break;
    case 'DELETE':
      // TODO check for loggedIn Employee
      await prisma.housing
        .delete({
          where: {
            id: id,
          },
        })
        .then((housing) => {
          if (housing) {
            res.status(200).end('Housing deleted');
          } else {
            res.status(400).end('Invalid Housing ID');
          }
        })
        .catch((err) => {
          console.log(err)
          res.status(500).end('Internal Database Server Error');
        });
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
