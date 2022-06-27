import type {
  AboutUsUpdate,
  AboutUsDelete,
  Donation,
  Kita,
  Post,
  Refugee,
  Family,
} from 'util/interfaces/events';
import { JSONSchemaType } from 'ajv';

export const AboutUsUpdateEvent: JSONSchemaType<AboutUsUpdate> = {
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
      const: 'Updated About US',
    },
    service_name: {
      type: 'string',
      const: 'Integration',
    },
    date: {
      type: 'string',
      format: 'date-time',
    },
    url: {
      type: 'string',
    },
    about_us: {
      type: 'string',
      minLength: 1,
      nullable: true,
    },
    picture: {
      type: 'string',
      minLength: 1,
      nullable: true,
    },
  },
  required: ['event_id', 'event_name', 'service_name', 'date', 'url'],
  additionalProperties: false,
};

export const AboutUsDeleteEvent: JSONSchemaType<AboutUsDelete> = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'About Us Landing Page via RabbitMQ',
  description: 'Event data',
  type: 'object',
  properties: {
    event_id: {
      type: 'integer',
      const: 9006,
    },
    event_name: {
      type: 'string',
      const: 'Delete My Service',
    },
    service_name: {
      type: 'string',
      const: 'Integration',
    },
    date: {
      type: 'string',
      format: 'date-time',
    },
  },
  required: ['event_id', 'event_name', 'service_name', 'date'],
  additionalProperties: false,
};

export const DonationEvent: JSONSchemaType<Donation> = {
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

export const KitaEvent: JSONSchemaType<Kita> = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Send Kita Application Data to Kita via RabbitMQ',
  description: 'Schema for RabbitMQ Event',
  type: 'object',
  properties: {
    event_id: {
      type: 'integer',
      const: 9002,
    },
    event_name: {
      type: 'string',
      const: 'Refugee Kita Application',
    },
    service_name: {
      type: 'string',
      const: 'integration',
    },
    care_time: {
      type: 'integer',
      minimum: 20,
      maximum: 45,
    },
    child: {
      type: 'object',
      properties: {
        citizen_id: {
          type: 'number',
          minimum: 1,
        },
      },
      required: ['citizen_id'],
    },
    parent: {
      type: 'object',
      properties: {
        citizen_id: {
          type: 'number',
          minimum: 1,
        },
      },
      required: ['citizen_id'],
    },
  },
  required: ['event_id', 'event_name', 'service_name', 'care_time', 'child', 'parent'],
  additionalProperties: false,
};

export const PostEvent: JSONSchemaType<Post> = {
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
      const: 'newServicePost',
    },
    service: {
      type: 'string',
      const: 'integration',
    },
    title: {
      type: 'string',
      minLength: 1,
    },
    short_description: {
      type: 'string',
      minLength: 1,
    },
    long_description: {
      type: 'string',
      minLength: 1,
      nullable: true,
    },
    picture_url: {
      type: 'string',
      minLength: 1,
      nullable: true,
    },
    event_on: {
      type: 'string',
      format: 'date-time',
      nullable: true,
    },
  },
  required: ['event_id', 'event_name', 'service', 'title', 'short_description'],
  additionalProperties: false,
};

export const RegisterEvent: JSONSchemaType<Refugee> = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Send New Refugee to Buergerbuero via RabbitMQ',
  description: 'Event data',
  type: 'object',
  properties: {
    event_id: {
      type: 'integer',
      const: 9000,
    },
    event_name: {
      type: 'string',
      const: 'Register New Refugee',
    },
    service_name: {
      type: 'string',
      const: 'integration',
    },
    refugee: {
      type: 'object',
      properties: {
        firstname: {
          type: 'string',
          minLength: 1,
        },
        lastname: {
          type: 'string',
          minLength: 1,
        },
        date_of_birth: {
          type: 'string',
          format: 'date-time',
        },
        email: {
          type: 'string',
          format: 'email',
        },
      },
      required: ['firstname', 'lastname', 'date_of_birth', 'email'],
    },
  },
  required: ['event_id', 'event_name', 'service_name', 'refugee'],
  additionalProperties: false,
};

export const RegisterFamilyEvent: JSONSchemaType<Family> = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Send New Refugee Family to Buergerbuero via RabbitMQ',
  description: 'Event data',
  type: 'object',
  properties: {
    event_id: {
      type: 'integer',
      const: 9001,
    },
    event_name: {
      type: 'string',
      const: 'Register New Refugee Family',
    },
    service_name: {
      type: 'string',
      const: 'integration',
    },
    parents: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          firstname: {
            type: 'string',
            minLength: 1,
          },
          lastname: {
            type: 'string',
            minLength: 1,
          },
          date_of_birth: {
            type: 'string',
            format: 'date-time',
          },
          email: {
            type: 'string',
            format: 'email',
          },
        },
        required: ['firstname', 'lastname', 'date_of_birth', 'email'],
      },
    },
    children: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          firstname: {
            type: 'string',
            minLength: 1,
          },
          lastname: {
            type: 'string',
            minLength: 1,
          },
          date_of_birth: {
            type: 'string',
            format: 'date-time',
          },
          email: {
            type: 'string',
            format: 'email',
          },
        },
        required: ['firstname', 'lastname', 'date_of_birth', 'email'],
      },
    },
  },
  required: ['event_id', 'event_name', 'service_name', 'parents', 'children'],
  additionalProperties: false,
};
