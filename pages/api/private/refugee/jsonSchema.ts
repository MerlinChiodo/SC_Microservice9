import { JSONSchemaType } from 'ajv';

export interface RegisterRefugee {
  firstname: string;
  lastname: string;
  date_of_birth: string;
  email: string;
  phone: string;
  nationality: string;
  language: string;
  document: Buffer;
}

export interface RegisterRefugeeFamily {
  parents: RegisterRefugee[];
  children: RegisterRefugee[];
}

interface RegisterRefugeeRabbitMQData {
  firstname: string;
  lastname: string;
  date_of_birth: string;
  email: string;
}

export interface RegisterRefugeeRabbitMQ {
  event_id: number;
  event_name: string;
  service_name: string;
  refugee: RegisterRefugeeRabbitMQData;
}

export interface RegisterRefugeeFamilyRabbitMQ {
  event_id: number;
  event_name: string;
  service_name: string;
  parents: RegisterRefugeeRabbitMQData[];
  children: RegisterRefugeeRabbitMQData[];
}

export const RegisterRefugeeSchema: JSONSchemaType<RegisterRefugee> = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Register new Refugee',
  description: 'Data for a new Refugee',
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
    phone: {
      type: 'string',
      minLength: 1,
    },
    nationality: {
      type: 'string',
      minLength: 1,
    },
    language: {
      type: 'string',
      minLength: 1,
    },
    document: {
      type: 'object',
      required: [],
    },
  },
  required: ['firstname', 'lastname', 'date_of_birth', 'email'],
  additionalProperties: false,
};

export const RegisterRefugeeRabbitMQSchema: JSONSchemaType<RegisterRefugeeRabbitMQ> = {
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

export const RegisterRefugeeFamilySchema: JSONSchemaType<RegisterRefugeeFamily> = {
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
            format: 'date-time',
          },
          email: {
            type: 'string',
            format: 'email',
          },
          phone: {
            type: 'string',
            minLength: 1,
          },
          nationality: {
            type: 'string',
            minLength: 1,
          },
          language: {
            type: 'string',
            minLength: 1,
          },
          document: {
            type: 'object',
            required: [],
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
          phone: {
            type: 'string',
            minLength: 1,
          },
          nationality: {
            type: 'string',
            minLength: 1,
          },
          language: {
            type: 'string',
            minLength: 1,
          },
          document: {
            type: 'object',
            required: [],
          },
        },
        required: ['firstname', 'lastname', 'date_of_birth', 'email'],
      },
    },
  },
  required: ['parents', 'children'],
  additionalProperties: false,
};

export const RefugeeFamilyRabbitMQSchema: JSONSchemaType<RegisterRefugeeFamilyRabbitMQ> = {
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
