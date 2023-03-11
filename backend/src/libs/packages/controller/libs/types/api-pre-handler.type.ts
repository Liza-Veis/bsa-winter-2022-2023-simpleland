import { type ApiHandlerOptions } from './api-handler-options.type.js';

type ApiPreHandler = (options: ApiHandlerOptions) => void | Promise<void>;

export { type ApiPreHandler };
