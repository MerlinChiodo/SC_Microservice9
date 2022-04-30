import { NextApiRequest, NextApiResponse } from 'next';
import amqp from 'amqplib/callback_api';
import Ajv from 'ajv';
import { KitaDataSchema, KitaRabbitMQSchema } from './jsonSchema';

export default function kitaHandler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const ajv = new Ajv({ allErrors: true });

  switch (method) {
    case 'POST':
      // Validation JSON Schemas
      if (!ajv.validate(KitaDataSchema, req.body)) {
        res.status(400).end('Invalid Kita Data');
        break;
      }

      const event = {
        event_id: 9002,
        event_name: 'Refugee Kita Application',
        service_name: 'integration',
        care_time: req.body.care_time,
        child: req.body.child,
        parent: req.body.parent,
      };

      // Validation JSON Schema RabbitMQ
      if (!ajv.validate(KitaRabbitMQSchema, event)) {
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
