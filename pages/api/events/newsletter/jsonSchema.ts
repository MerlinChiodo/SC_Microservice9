import { JSONSchemaType } from 'ajv';

interface NewsletterData {
  title: string;
  text: string;
  picture_url: string;
  date: string;
}

interface NewsletterRabbitMQData {
  event_id: number;
  event_name: string;
  service_name: string;
  title: string;
  text: string;
  picture_url: string;
  date: string;
}

export const NewsletterDataSchema: JSONSchemaType<NewsletterData> = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Send New Post to Newsletter',
  description: 'Data for a new Post',
  type: 'object',
  properties: {
    title: {
      type: 'string',
      minLength: 1,
    },
    text: {
      type: 'string',
      minLength: 1,
    },
    picture_url: {
      type: 'string',
      minLength: 1,
    },
    date: {
      type: 'string',
      format: 'date',
    },
  },
  required: ['title', 'text', 'date'],
  additionalProperties: false,
};

export const NewsletterRabbitMQSchema: JSONSchemaType<NewsletterRabbitMQData> = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Send New Post to Newsletter via RabbitMQ',
  description: 'Event data',
  type: 'object',
  properties: {
    event_id: {
      type: 'integer',
      const: 9004,
    },
    event_name: {
      type: 'string',
      const: 'New Newsletter Post',
    },
    service_name: {
      type: 'string',
      const: 'integration',
    },
    title: {
      type: 'string',
      minLength: 1,
    },
    text: {
      type: 'string',
      minLength: 1,
    },
    picture_url: {
      type: 'string',
      minLength: 1,
    },
    date: {
      type: 'string',
      format: 'date',
    },
  },
  required: ['event_id', 'event_name', 'service_name', 'title', 'text', 'date'],
  additionalProperties: false,
};
