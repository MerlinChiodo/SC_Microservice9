import amqp from 'amqplib/callback_api';
import Ajv from 'ajv';
import { KitaRabbitMQSchema } from './jsonSchema';

interface Child {
  id_citizen: string;
}

interface Parent {
  id_citizen: string;
}

interface KitaEvent {
  event_id: number;
  event_name: string;
  service_name: string;
  care_time: number;
  child: Child;
  parent: Parent;
}

export default function kitaEventHandler(event: KitaEvent) {
  const ajv = new Ajv({ allErrors: true });

  return new Promise((resolve, reject) => {
    // Validation JSON Schema RabbitMQ
    if (!ajv.validate(KitaRabbitMQSchema, event)) {
      reject({
        code: 400,
        message: 'Invalid RabbitMQ Event Data. Please Contact Integration Support Team',
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
