import { logger } from '~/libs/packages/logger/logger.js';

import { PermissionController } from './permission.controller.js';
import { PermissionModel } from './permission.model.js';
import { PermissionRepository } from './permission.repository.js';
import { PermissionService } from './permission.service.js';

const permissionRepository = new PermissionRepository(PermissionModel);
const permissionService = new PermissionService(permissionRepository);
const permissionController = new PermissionController(
  logger,
  permissionService,
);

export { permissionController, permissionService };
export { checkHasPermissions } from './libs/hooks/hooks.js';
export { PermissionModel } from './permission.model.js';
