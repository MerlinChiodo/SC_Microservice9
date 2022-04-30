import { JSONSchemaType } from 'ajv';

interface RefugeeData {
  firstname: string;
  lastname: string;
  date_of_birth: string;
  email: string;
}

interface RefugeeRabbitMQData {
  event_id: number;
  event_name: string;
  service_name: string;
  refugee: RefugeeData;
}

interface RefugeeFamilyData {
  parents: RefugeeData[];
  children: RefugeeData[];
}

interface RefugeeFamilyRabbitMQData {
  event_id: number;
  event_name: string;
  service_name: string;
  parents: RefugeeData[];
  children: RefugeeData[];
}

export const RefugeeDataSchema: JSONSchemaType<RefugeeData> = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Send New Refugee to Buergerbuero',
  description: 'Data for a new Citizen',
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
      format: 'date',
    },
    email: {
      type: 'string',
      format: 'email',
    },
  },
  required: ['firstname', 'lastname', 'date_of_birth', 'email'],
  additionalProperties: false,
};

export const RefugeeRabbitMQSchema: JSONSchemaType<RefugeeRabbitMQData> = {
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
          format: 'date',
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

export const RefugeeFamilyDataSchema: JSONSchemaType<RefugeeFamilyData> = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Send New Family to Buergerbuero',
  description: 'Data for a new Family',
  type: 'object',
  properties: {
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
            format: 'date',
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
            format: 'date',
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
  required: ['parents', 'children'],
  additionalProperties: false,
};

export const RefugeeFamilyRabbitMQSchema: JSONSchemaType<RefugeeFamilyRabbitMQData> = {
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
            format: 'date',
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
            format: 'date',
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
