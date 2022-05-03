import { JSONSchemaType } from 'ajv';

export interface Citizen {
  citizen_id: number;
}

interface Child {
  citizen_id: number;
  refugee_id: number;
}
interface Parent {
  citizen_id: number;
  refugee_id: number;
}

interface Kita {
  date: string;
  care_time: number;
  child: Child;
  parent: Parent;
}

export interface KitaRabbitMQ {
  event_id: number;
  event_name: string;
  service_name: string;
  care_time: number;
  child: Citizen;
  parent: Citizen;
}

export const KitaSchema: JSONSchemaType<Kita> = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Kita Application',
  description: 'Data for a new Kita Application',
  type: 'object',
  properties: {
    date: {
      type: 'string',
      format: 'date-time',
    },
    care_time: {
      type: 'number',
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
        refugee_id: {
          type: 'integer',
          minimum: 1,
        },
      },
      required: ['citizen_id', 'refugee_id'],
    },
    parent: {
      type: 'object',
      properties: {
        citizen_id: {
          type: 'number',
          minimum: 1,
        },
        refugee_id: {
          type: 'integer',
          minimum: 1,
        },
      },
      required: ['citizen_id', 'refugee_id'],
    },
  },
  required: ['date', 'child', 'parent'],
  additionalProperties: false,
};

export const KitaRabbitMQSchema: JSONSchemaType<KitaRabbitMQ> = {
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
