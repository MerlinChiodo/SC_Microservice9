import { JSONSchemaType } from 'ajv';

interface Donation {
  amount: number;
  citizen_id: number;
}

export interface DonationRabbitMQ {
  event_id: number;
  event_name: string;
  service_name: string;
  amount: number;
  citizen_id: number;
}

export const DonationSchema: JSONSchemaType<Donation> = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Donation',
  description: 'Data for a new Donation',
  type: 'object',
  properties: {
    amount: {
      type: 'number',
      minimum: 0,
      maximum: 5000,
    },
    citizen_id: {
      type: 'number',
      minimum: 1,
    },
  },
  required: ['amount'],
  additionalProperties: false,
};

export const DonationRabbitMQSchema: JSONSchemaType<DonationRabbitMQ> = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Send New Donation to Finanzamt via RabbitMQ',
  description: 'Event data',
  type: 'object',
  properties: {
    event_id: {
      type: 'integer',
      const: 9003,
    },
    event_name: {
      type: 'string',
      const: 'Notify Incoming Donation',
    },
    service_name: {
      type: 'string',
      const: 'integration',
    },
    amount: {
      type: 'number',
      minimum: 5,
      maximum: 5000,
    },
    citizen_id: {
      type: 'number',
      minimum: 1,
    },
  },
  required: ['event_id', 'event_name', 'service_name', 'amount', 'citizen_id'],
  additionalProperties: false,
};
