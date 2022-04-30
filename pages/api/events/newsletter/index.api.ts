import { NextApiRequest, NextApiResponse } from 'next';
import amqp from 'amqplib/callback_api';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { NewsletterDataSchema, NewsletterRabbitMQSchema } from './jsonSchema';

export default function newsletterHandler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const ajv = new Ajv({ allErrors: true });
  addFormats(ajv);

  switch (method) {
    case 'POST':
      // Validation JSON Schemas
      if (!ajv.validate(NewsletterDataSchema, req.body)) {
        res.status(400).end('Invalid Newsletter Data');
        break;
      }

      const event = {
        event_id: 9004,
        event_name: 'New Newsletter Post',
        service_name: 'integration',
        title: req.body.title,
        text: req.body.text,
        picture_url: req.body.picture_url,
        date: req.body.date,
      };
      
      // Validation JSON Schema RabbitMQ
      if (!ajv.validate(NewsletterRabbitMQSchema, event)) {
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
          ch.publish(ex, 'public.integration', Buffer.from(JSON.stringify(event)));
        });
      });
      res.status(200).end('ok');
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
