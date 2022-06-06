import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import {
  AboutUsUpdateEvent,
  AboutUsDeleteEvent,
  DonationEvent,
  KitaEvent,
  PostEvent,
  RegisterEvent,
  RegisterFamilyEvent,
} from 'util/validators/jsonSchema/events';

import { NewHousingREST, NewPostREST, RefugeeREST } from 'util/validators/jsonSchema/rest';
import type { Event } from 'util/interfaces/events';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

export const validatorEvent = (event: Event) => {
  const error = { code: 400, message: 'Invalid RabbitMQ Event' };
  switch (event.event_id) {
    case 9000:
      if (!ajv.validate(RegisterEvent, event)) return error;
      break;
    case 9001:
      if (!ajv.validate(RegisterFamilyEvent, event)) return error;
      break;
    case 9002:
      if (!ajv.validate(KitaEvent, event)) return error;
      break;
    case 9003:
      if (!ajv.validate(DonationEvent, event)) return error;
      break;
    case 9004:
      if (!ajv.validate(PostEvent, event)) return error;
      break;
    case 9005:
      if (!ajv.validate(AboutUsUpdateEvent, event)) return error;
      break;
    case 9006:
      if (!ajv.validate(AboutUsDeleteEvent, event)) return error;
      break;
    default:
      return error;
  }
};

export const validatorREST = (req: any, name: string) => {
  const error = { code: 400, message: 'Invalid REST API Request' };
  switch (name) {
    case 'newHousing':
      if (!ajv.validate(NewHousingREST, req)) return error;
      break;
    case 'newPost':
      if (!ajv.validate(NewPostREST, req)) return error;
      break;
    case 'register-refugee':
      if (!ajv.validate(RefugeeREST, req)) return error;
      break;
    default:
      return error;
  }
};
