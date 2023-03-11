import { GroupsToPermissionsModel } from './groups-to-permissions.model.js';
import { GroupsToPermissionsRepository } from './groups-to-permissions.repository.js';
import { GroupsToPermissionsService } from './groups-to-permissions.service.js';

const groupsToPermissionsRepository = new GroupsToPermissionsRepository(
  GroupsToPermissionsModel,
);
const groupsToPermissionsService = new GroupsToPermissionsService(
  groupsToPermissionsRepository,
);

export { groupsToPermissionsService };
export { GroupsToPermissionsModel } from './groups-to-permissions.model.js';
