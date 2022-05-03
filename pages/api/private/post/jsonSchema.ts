import { JSONSchemaType } from 'ajv';

interface Post {
  title: string;
  text: string;
  picture_url: string;
  date: string;
  employee_id: string;
}

interface PostRabbitMQ {
  event_id: number;
  event_name: string;
  service_name: string;
  title: string;
  text: string;
  picture_url: string;
  date: string;
}

export const PostSchema: JSONSchemaType<Post> = {
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
    employee_id: {
      type: 'string',
      minLength: 1,
    }
  },
  required: ['title', 'text', 'date', 'employee_id'],
  additionalProperties: false,
};

export const PostRabbitMQSchema: JSONSchemaType<PostRabbitMQ> = {
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
