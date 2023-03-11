import { logger } from '~/libs/packages/logger/logger.js';
import { groupsToPermissionsService } from '~/packages/groups-to-permissions/groups-to-permissions.js';
import { permissionService } from '~/packages/permissions/permissions.js';
import { userService } from '~/packages/users/users.js';
import { usersToGroupsService } from '~/packages/users-to-groups/users-to-groups.js';

import { GroupController } from './group.controller.js';
import { GroupModel } from './group.model.js';
import { GroupRepository } from './group.repository.js';
import { GroupService } from './group.service.js';

const groupRepository = new GroupRepository(GroupModel);
const groupService = new GroupService({
  groupRepository,
  permissionService,
  userService,
  usersToGroupsService,
  groupsToPermissionsService,
});
const groupController = new GroupController(logger, groupService);

export { groupController, groupService };
export { GroupModel } from './group.model.js';
