import { JSONSchemaType } from 'ajv';

interface AboutUsData {
  about_us: string;
  picture: string;
}

interface LandingPageRabbitMQData {
  event_id: number;
  event_name: string;
  service_name: string;
  about_us: string;
  picture: string;
}

export const AboutUsDataSchema: JSONSchemaType<AboutUsData> = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'About Us Landing Page',
  description: 'Data for the About Us Landing Page',
  type: 'object',
  properties: {
    about_us: {
      type: 'string',
      minLength: 1,
    },
    picture: {
      type: 'string',
      minLength: 1,
    },
  },
  required: ['about_us', 'picture'],
  additionalProperties: false,
};

export const LandingPageRabbitMQSchema: JSONSchemaType<LandingPageRabbitMQData> = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'About Us Landing Page via RabbitMQ',
  description: 'Event data',
  type: 'object',
  properties: {
    event_id: {
      type: 'integer',
      const: 9005,
    },
    event_name: {
      type: 'string',
      const: 'Update About Us',
    },
    service_name: {
      type: 'string',
      const: 'integration',
    },
    about_us: {
      type: 'string',
      minLength: 1,
    },
    picture: {
      type: 'string',
      minLength: 1,
    },
  },
  required: ['event_id', 'event_name', 'service_name', 'about_us', 'picture'],
  additionalProperties: false,
};
