import { JSONSchemaType } from 'ajv';

interface Housing {
  housing_type: string;
  people_assigned: number;
  people_limit: number;
  size: number;
  shared_bathroom: boolean;
  rooms: number;
  rent: number;
  info: string;
  citizen_id: number;
}

interface HousingPUT {
  housing_type: string;
  people_assigned: number;
  people_limit: number;
  size: number;
  shared_bathroom: boolean;
  rooms: number;
  rent: number;
  info: string;
  citizen_id: number;
  address_id: number;
}

interface Address {
  house_number: number;
  street: string;
  city_code: number;
}

interface HousingData {
  housing: Housing;
  address: Address;
}

export const HousingDataSchema: JSONSchemaType<HousingData> = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Housing',
  description: 'Data for a new Housing',
  type: 'object',
  properties: {
    housing: {
      type: 'object',
      properties: {
        housing_type: {
          type: 'string',
          minLength: 1,
        },
        people_assigned: {
          type: 'integer',
          minimum: 0,
        },
        people_limit: {
          type: 'integer',
          minimum: 1,
        },
        size: {
          type: 'number',
          minimum: 1,
          maximum: 300,
        },
        shared_bathroom: {
          type: 'boolean',
        },
        rooms: {
          type: 'number',
          minimum: 1,
          maximum: 15,
        },
        rent: {
          type: 'number',
          minimum: 0,
          maximum: 3000,
        },
        info: {
          type: 'string',
          minLength: 0,
        },
        citizen_id: {
          type: 'number',
          minimum: 1,
        },
      },
      required: ['housing_type', 'size', 'rent', 'people_limit'],
      additionalProperties: false,
    },
    address: {
      type: 'object',
      properties: {
        house_number: {
          type: 'integer',
          minimum: 1,
          maximum: 1000,
        },
        street: {
          type: 'string',
          minLength: 1,
        },
        city_code: {
          type: 'integer',
          minimum: 1,
          maximum: 99999,
        },
      },
      required: ['house_number', 'street', 'city_code'],
      additionalProperties: false,
    },
  },
  required: ['housing', 'address'],
  additionalProperties: false,
};

export const HousingPUTSchema: JSONSchemaType<HousingPUT> = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Housing',
  description: 'Data for update Housing',
  type: 'object',
  properties: {
    housing_type: {
      type: 'string',
      minLength: 1,
    },
    people_assigned: {
      type: 'integer',
      minimum: 0,
    },
    people_limit: {
      type: 'integer',
      minimum: 1,
    },
    size: {
      type: 'number',
      minimum: 1,
      maximum: 300,
    },
    shared_bathroom: {
      type: 'boolean',
    },
    rooms: {
      type: 'number',
      minimum: 1,
      maximum: 15,
    },
    rent: {
      type: 'number',
      minimum: 0,
      maximum: 3000,
    },
    info: {
      type: 'string',
      minLength: 0,
    },
    citizen_id: {
      type: 'number',
      minimum: 1,
    },
    address_id: {
      type: 'number',
      minimum: 1,
    },
  },
  required: [],
  additionalProperties: false,
}

