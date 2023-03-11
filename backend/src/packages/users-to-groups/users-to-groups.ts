import { UsersToGroupsModel } from './users-to-groups.model.js';
import { UsersToGroupsRepository } from './users-to-groups.repository.js';
import { UsersToGroupsService } from './users-to-groups.service.js';

const usersToGroupsRepository = new UsersToGroupsRepository(UsersToGroupsModel);
const usersToGroupsService = new UsersToGroupsService(usersToGroupsRepository);

export { usersToGroupsService };
export { UsersToGroupsModel } from './users-to-groups.model.js';
