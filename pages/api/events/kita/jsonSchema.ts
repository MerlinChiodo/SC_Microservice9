import { JSONSchemaType } from 'ajv';

interface citizen {
  id_citizen: string;
}

interface KitaData {
  care_time: number;
  child: citizen;
  parent: citizen[];
}

interface KitaRabbitMQData {
  event_id: number;
  event_name: string;
  service_name: string;
  care_time: number;
  child: citizen;
  parent: citizen[];
}

export const KitaDataSchema: JSONSchemaType<KitaData> = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Send Kita Application Data',
  description: 'Schema for Kita Application Data',
  type: 'object',
  properties: {
    care_time: {
      type: 'integer',
      minimum: 20,
      maximum: 45,
    },
    child: {
      type: 'object',
      properties: {
        id_citizen: {
          type: 'string',
          minLength: 1,
        },
      },
      required: ['id_citizen'],
    },
    parent: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id_citizen: {
            type: 'string',
            minLength: 1,
          },
        },
        required: ['id_citizen'],
      },
    },
  },
  required: ['care_time', 'child', 'parent'],
  additionalProperties: false,
};

export const KitaRabbitMQSchema: JSONSchemaType<KitaRabbitMQData> = {
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
        id_citizen: {
          type: 'string',
          minLength: 1,
        },
      },
      required: ['id_citizen'],
    },
    parent: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id_citizen: {
            type: 'string',
            minLength: 1,
          },
        },
        required: ['id_citizen'],
      },
    },
  },
  required: ['event_id', 'event_name', 'service_name', 'care_time', 'child', 'parent'],
  additionalProperties: false,
};