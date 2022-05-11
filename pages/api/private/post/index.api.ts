import { NextApiRequest, NextApiResponse } from 'next';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { prisma } from '../../../../lib/prisma';
import { PostSchema } from './jsonSchema';
import newPostEventHandler from './event';
import auth from '../../../../lib/auth';

export default function newPostHandler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const ajv = new Ajv({ allErrors: true });
  addFormats(ajv);

  req.cookies.token = 'test';
  if (!auth(req.cookies.token)){
      res.status(403).end(`No Authorization`);
  } 

  switch (method) {
    case 'POST':
      // Validation JSON Schema REST API Call
      if (!ajv.validate(PostSchema, req.body)) {
        res.status(400).end('Invalid Post Data');
        return;
      }

      const event = {
        event_id: 9004,
        event_name: 'New Newsletter Post',
        service_name: 'integration',
        title: req.body.title,
        text: req.body.text,
        picture: req.body.picture,
        date: req.body.date,
      };

      const db = {
        title: req.body.title,
        text: req.body.text,
        picture: req.body.picture,
        date: new Date(req.body.date),
        employee_id: req.body.employee_id,
      };

      // Send Event via RabbitMQ
      newPostEventHandler(event)
        .then(() => {
          // create record about application in db
          prisma.post
            .create({ data: db })
            .then((post) => res.status(200).json(post))
            .catch((err) => {
              console.log(err);
              res.status(500).end('Internal Database Server Error');
            });
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
