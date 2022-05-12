import amqp from 'amqplib/callback_api';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { RegisterRefugeeRabbitMQ, RegisterRefugeeRabbitMQSchema } from './jsonSchema';

export function registerRefugeeEventHandler(event: RegisterRefugeeRabbitMQ) {
  const ajv = new Ajv({ allErrors: true });
  addFormats(ajv);
  return new Promise((resolve, reject) => {
    // Validation JSON Schema RabbitMQ
    if (!ajv.validate(RegisterRefugeeRabbitMQSchema, event)) {
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
