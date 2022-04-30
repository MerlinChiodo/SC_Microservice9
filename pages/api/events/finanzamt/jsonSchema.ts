import { JSONSchemaType } from 'ajv';

interface DonationData {
  amount: number;
  id_citizen: string;
}

interface DonationRabbitMQData {
  event_id: number;
  event_name: string;
  service_name: string;
  amount: number;
  id_citizen: string;
}

export const DonationDataSchema: JSONSchemaType<DonationData> = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Send New Donation to Finanzamt',
  description: 'Data for a new Donation',
  type: 'object',
  properties: {
    amount: {
      type: 'number',
      minimum: 5,
      maximum: 5000,
    },
    id_citizen: {
      type: 'string',
      minLength: 1,
    },
  },
  required: ['amount'],
  additionalProperties: false,
};

export const DonationRabbitMQSchema: JSONSchemaType<DonationRabbitMQData> = {
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
    id_citizen: {
      type: 'string',
      minLength: 1,
    },
  },
  required: ['event_id', 'event_name', 'service_name', 'amount', 'id_citizen'],
  additionalProperties: false,
};
