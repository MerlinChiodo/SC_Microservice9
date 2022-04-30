import { NextApiRequest, NextApiResponse } from 'next';
import amqp from 'amqplib/callback_api';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { RefugeeDataSchema, RefugeeRabbitMQSchema } from './jsonSchema';

export default function refugeeHandler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const ajv = new Ajv({ allErrors: true });
  addFormats(ajv);

  switch (method) {
    case 'POST':
      // Validation JSON Schemas REST
      if (!ajv.validate(RefugeeDataSchema, req.body)) {
        res.status(400).end('Invalid Refugee Data');
        break;
      }

      const event = {
        event_id: 9000,
        event_name: 'Register New Refugee',
        service_name: 'integration',
        refugee: req.body,
      };

      // Validation JSON Schema RabbitMQ
      if (!ajv.validate(RefugeeRabbitMQSchema, event)) {
        res.status(400).end('Invalid RabbitMQ Event Data. Please Contact Integration Support Team');
        break;
      }

      // Changing event_id for testing
      if (process.env.TESTING === 'true') {
        event.event_id = 9999;
      }

      // RabbitMQ
      if (typeof process.env.RABBITMQ_URL === 'undefined') {
        res.status(500).end('RabbitMQ is not configured');
        break;
      }
      amqp.connect(process.env.RABBITMQ_URL, (err: any, conn: any) => {
        if (err) throw err;
        conn.createChannel((err: any, ch: any) => {
          if (err) throw err;
          const ex = 'events';
          ch.publish(ex, 'private.integration', Buffer.from(JSON.stringify(event)));
        });
      });
      res.status(200).end('ok');
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
