import amqp from 'amqplib/callback_api';
import Ajv from 'ajv';
import { DonationRabbitMQSchema } from './jsonSchema';

interface DonationEvent {
  event_id: number;
  event_name: string;
  service_name: string;
  amount: number;
  id_citizen?: string;
}

export default function donationEventHandler(event: DonationEvent) {
  const ajv = new Ajv({ allErrors: true });

  return new Promise((resolve, reject) => {
    // Validation RabbitMQ JSON Schema
    if (!ajv.validate(DonationRabbitMQSchema, event)) {
      reject({
        code: 400,
        message: 'Invalid RabbitMQ Event Data',
      });
      return;
    }

    // Change event_id for testing
    if (process.env.TESTING === 'true') {
      event.event_id = 9999;
    }

    // RabbitMQ
    if (typeof process.env.RABBITMQ_URL === 'undefined') {
      reject({ code: 500, message: 'RabbitMQ is not configured' });
      return;
    }
    amqp.connect(process.env.RABBITMQ_URL, (err: any, conn: any) => {
      if (err) throw err;
      conn.createChannel((err: any, ch: any) => {
        if (err) throw err;
        const ex = 'events';
        ch.publish(ex, 'private.integration', Buffer.from(JSON.stringify(event)));
      });
    });
    resolve('ok');
  });
}
