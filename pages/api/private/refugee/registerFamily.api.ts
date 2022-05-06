import { NextApiRequest, NextApiResponse } from 'next';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { RegisterRefugeeFamilySchema } from './jsonSchema';
import { registerFamily } from './registerHelper';

export default function registerFamilyHandler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const ajv = new Ajv({ allErrors: true });
  addFormats(ajv);

  switch (method) {
    case 'POST':
      // Validate Refugee Family JSON Schema REST API call
      if (!ajv.validate(RegisterRefugeeFamilySchema, req.body)) {
        res.status(400).end('Invalid Register Data');
        break;
      }
      try {
        const refugeeFamily = registerFamily(req.body);
        res.status(200).json(refugeeFamily);
      } catch (err) {
        res.status(500).end('Error Register Family, please contact support team');
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
