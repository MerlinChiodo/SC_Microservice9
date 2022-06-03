import { Housing, Kita, Post, Refugee } from 'util/interfaces/rest';
import { JSONSchemaType } from 'ajv';

export const NewHousingREST: JSONSchemaType<Housing> = {
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
        people_limit: {
          type: 'integer',
          minimum: 1,
        },
        people_assigned: {
          type: 'integer',
          minimum: 0,
          nullable: true,
        },
        size: {
          type: 'number',
          minimum: 1,
          maximum: 300,
        },
        shared_bathroom: {
          type: 'boolean',
          nullable: true,
        },
        rooms: {
          type: 'number',
          minimum: 1,
          maximum: 15,
          nullable: true,
        },
        rent: {
          type: 'number',
          minimum: 0,
          maximum: 3000,
        },
        info: {
          type: 'string',
          minLength: 0,
          nullable: true,
        },
        citizen_id: {
          type: 'number',
          minimum: 1,
        },
      },
      required: ['housing_type', 'size', 'rent', 'people_limit', 'citizen_id'],
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

export const KitaREST: JSONSchemaType<Kita> = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Kita Application',
  description: 'Data for a new Kita Application',
  type: 'object',
  properties: {
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
  required: ['child', 'parent'],
  additionalProperties: false,
};

export const NewPostREST: JSONSchemaType<Post> = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Send New Post to Newsletter',
  description: 'Data for a new Post',
  type: 'object',
  properties: {
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
    employee_id: {
      type: 'number',
      minimum: 1,
    },
  },
  required: ['title', 'short_description', 'employee_id'],
  additionalProperties: false,
};

export const RefugeeREST: JSONSchemaType<Refugee> = {
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
    family_tag: {
      type: 'string',
      minLength: 1,
      nullable: true,
    },
    phone: {
      type: 'string',
      minLength: 1,
      nullable: true,
    },
    nationality: {
      type: 'string',
      minLength: 1,
      nullable: true,
    },
    document: {
      type: 'object',
      required: [],
      nullable: true,
    },
  },
  required: ['firstname', 'lastname', 'date_of_birth', 'email'],
  additionalProperties: false,
};
