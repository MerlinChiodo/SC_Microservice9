import { JSONSchemaType } from 'ajv';

interface Citizen {
  id_citizen: string;
}

interface Child {
  id_citizen: string;
  id_refugee: number;
}
interface Parent {
  id_citizen: string;
  id_refugee: number;
}

interface Kita {
  date: string;
  care_time: number;
  child: Child;
  parent: Parent;
}

interface KitaRabbitMQData {
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
      format: 'date',
    },
    care_time: {
      type: 'number',
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
        id_refugee: {
          type: 'integer',
          minimum: 1,
        },
      },
      required: ['id_citizen', 'id_refugee'],
    },
    parent: {
      type: 'object',
      properties: {
        id_citizen: {
          type: 'string',
          minLength: 1,
        },
        id_refugee: {
          type: 'integer',
          minimum: 1,
        },
      },
      required: ['id_citizen', 'id_refugee'],
    },
  },
  required: ['date', 'child', 'parent'],
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
  required: ['event_id', 'event_name', 'service_name', 'care_time', 'child', 'parent'],
  additionalProperties: false,
};
