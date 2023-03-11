import { type ILogger } from '~/libs/packages/logger/logger.js';
import { type ServerAppRouteParameters } from '~/libs/packages/server-application/server-application.js';

import { type IController } from './libs/interfaces/interface.js';
import {
  type ApiHandler,
  type ApiHandlerOptions,
  type ApiPreHandler,
  type ControllerRouteParameters,
} from './libs/types/types.js';

class Controller implements IController {
  private logger: ILogger;

  private apiUrl: string;

  public routes: ServerAppRouteParameters[];

  public constructor(logger: ILogger, apiPath: string) {
    this.logger = logger;
    this.apiUrl = apiPath;
    this.routes = [];
  }

  public addRoute(options: ControllerRouteParameters): void {
    const { handler, preHandler, path } = options;
    const fullPath = this.apiUrl + path;

    const routeParameters: ServerAppRouteParameters = {
      ...options,
      path: fullPath,
      handler: (request, reply) => this.mapHandler(handler, request, reply),
    };

    if (preHandler) {
      routeParameters.preHandler = (request): void | Promise<void> =>
        this.mapPreHandler(preHandler, request);
    }

    this.routes.push(routeParameters);
  }

  private async mapHandler(
    handler: ApiHandler,
    request: Parameters<ServerAppRouteParameters['handler']>[0],
    reply: Parameters<ServerAppRouteParameters['handler']>[1],
  ): Promise<void> {
    this.logger.info(`${request.method.toUpperCase()} on ${request.url}`);

    const handlerOptions = this.mapRequest(request);
    const { status, payload } = await handler(handlerOptions);

    return await reply.status(status).send(payload);
  }

  private async mapPreHandler(
    handler: ApiPreHandler,
    request: Parameters<ServerAppRouteParameters['handler']>[0],
  ): Promise<void> {
    const handlerOptions = this.mapRequest(request);

    return await handler(handlerOptions);
  }

  private mapRequest(
    request: Parameters<ServerAppRouteParameters['handler']>[0],
  ): ApiHandlerOptions {
    const { body, query, params } = request;

    return {
      body,
      query,
      params,
    };
  }
}

export { Controller };
