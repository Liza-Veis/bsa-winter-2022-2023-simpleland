import { type HttpMethod } from '~/libs/packages/http/http.js';
import { type ValidationSchema } from '~/libs/types/types.js';

import { type ApiHandler } from './api-handler.type.js';
import { type ApiPreHandler } from './api-pre-handler.type.js';

type ControllerRouteParameters = {
  path: string;
  method: HttpMethod;
  handler: ApiHandler;
  preHandler?: ApiPreHandler;
  validation?: {
    body?: ValidationSchema;
  };
};

export { type ControllerRouteParameters };
