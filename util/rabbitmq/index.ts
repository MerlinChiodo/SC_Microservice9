import type { Event, Post } from 'util/interfaces/events';
import { validatorEvent } from 'util/validators';
import { isEmpty, isNotEmpty } from 'util/api/util';
import amqp from 'amqplib/callback_api';

export const eventHandler = (event: Event | Post) => {
  const error = validatorEvent(event);
  if (error) return error;
  if (isEmpty(process.env.RABBITMQ_URL))
    return { code: 500, message: 'RabbitMQ is not configured' };
  if (isNotEmpty(process.env.NEXT_PUBLIC_E2E_TEST)) return;

  amqp.connect(process.env.RABBITMQ_URL, (err: any, conn: any) => {
    if (err) return { code: 500, message: 'RabbitMQ connection error' };
    conn.createChannel((err: any, ch: any) => {
      if (err) return { code: 500, message: 'RabbitMQ create channel error' };
      const ex = 'events';
      ch.publish(ex, 'private.integration', Buffer.from(JSON.stringify(event)));
    });

    setTimeout(() => {
      conn.close();
    }, 500);
  });
};
