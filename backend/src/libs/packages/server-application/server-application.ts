import { config } from '~/libs/packages/config/config.js';
import { database } from '~/libs/packages/database/database.js';
import { logger } from '~/libs/packages/logger/logger.js';
import { authController } from '~/packages/auth/auth.js';
import { groupController } from '~/packages/groups/groups.js';
import { permissionController } from '~/packages/permissions/permissions.js';
import { userController } from '~/packages/users/users.js';

import { ServerApp } from './server-app.js';
import { ServerAppApi } from './server-app-api.js';

const apiV1 = new ServerAppApi(
  'v1',
  config,
  ...authController.routes,
  ...userController.routes,
  ...groupController.routes,
  ...permissionController.routes,
);
const serverApp = new ServerApp({
  config,
  logger,
  database,
  apis: [apiV1],
});

export { serverApp };
export { type ServerAppRouteParameters } from './libs/types/types.js';
