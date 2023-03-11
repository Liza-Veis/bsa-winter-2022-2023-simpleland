import { type IService } from '~/libs/interfaces/interfaces.js';
import { GroupEntity } from '~/packages/groups/group.entity.js';
import { type GroupRepository } from '~/packages/groups/group.repository.js';
import { type GroupsToPermissionsService } from '~/packages/groups-to-permissions/groups-to-permissions.service.js';
import { type PermissionService } from '~/packages/permissions/permission.service.js';
import { type UserService } from '~/packages/users/user.service.js';
import { type UsersToGroupsService } from '~/packages/users-to-groups/users-to-groups.service.js';

import { ExceptionMessage, HttpCode, StringCase } from './libs/enums/enums.js';
import { GroupError } from './libs/exceptions/exceptions.js';
import { changeStringCase } from './libs/helpers/helpers.js';
import {
  type GroupCreateRequestDto,
  type GroupCreateResponseDto,
  type GroupGetAllResponseDto,
  type GroupGetByIdResponseDto,
  type GroupUpdateRequestDto,
  type GroupUpdateResponseDto,
} from './libs/types/types.js';

type Constructor = {
  groupRepository: GroupRepository;
  permissionService: PermissionService;
  userService: UserService;
  usersToGroupsService: UsersToGroupsService;
  groupsToPermissionsService: GroupsToPermissionsService;
};

class GroupService implements IService {
  private groupRepository: GroupRepository;

  private permissionService: PermissionService;

  private userService: UserService;

  private usersToGroupsService: UsersToGroupsService;

  private groupsToPermissionsService: GroupsToPermissionsService;

  public constructor(parameters: Constructor) {
    const {
      groupRepository,
      permissionService,
      userService,
      usersToGroupsService,
      groupsToPermissionsService,
    } = parameters;

    this.groupRepository = groupRepository;
    this.permissionService = permissionService;
    this.userService = userService;
    this.usersToGroupsService = usersToGroupsService;
    this.groupsToPermissionsService = groupsToPermissionsService;
  }

  public async findAll(): Promise<GroupGetAllResponseDto> {
    const items = await this.groupRepository.findAll();

    return {
      items: items.map((it) => it.toObject()),
    };
  }

  public async findById(id: number): Promise<GroupGetByIdResponseDto> {
    const item = await this.groupRepository.findById(id);

    if (!item) {
      throw new GroupError({
        status: HttpCode.BAD_REQUEST,
        message: ExceptionMessage.INVALID_GROUP_ID,
      });
    }

    const usersToGroups = await this.usersToGroupsService.findByGroupId(id);
    const groupsToPermissions =
      await this.groupsToPermissionsService.findByGroupId(id);

    const userIds = usersToGroups.items.map((it) => it.userId);
    const permissionIds = groupsToPermissions.items.map(
      (it) => it.permissionId,
    );

    return {
      ...item.toObject(),
      userIds,
      permissionIds,
    };
  }

  public async create(
    payload: GroupCreateRequestDto,
  ): Promise<GroupCreateResponseDto> {
    const { name, userIds, permissionIds } = payload;

    const groupByName = await this.groupRepository.findByName(name);

    if (groupByName) {
      throw new GroupError({
        status: HttpCode.BAD_REQUEST,
        message: ExceptionMessage.GROUP_NAME_IS_ALREADY_TAKEN,
      });
    }

    const permissions = await this.permissionService.findByIds(permissionIds);

    if (permissions.items.length !== permissionIds.length) {
      throw new GroupError({
        status: HttpCode.BAD_REQUEST,
        message: ExceptionMessage.INVALID_GROUP_PERMISSIONS,
      });
    }

    const users = await this.userService.findByIds(userIds);

    if (users.items.length !== userIds.length) {
      throw new GroupError({
        status: HttpCode.BAD_REQUEST,
        message: ExceptionMessage.INVALID_GROUP_USERS,
      });
    }

    const item = await this.groupRepository.create(
      GroupEntity.initializeNew({
        name: name,
        key: changeStringCase({
          stringToChange: name,
          caseType: StringCase.SNAKE_CASE,
        }),
      }),
    );

    const group = item.toObject();

    await Promise.all(
      userIds.map((userId: number) => {
        return this.usersToGroupsService.create({
          groupId: group.id,
          userId,
        });
      }),
    );
    await Promise.all(
      permissionIds.map((permissionId: number) => {
        return this.groupsToPermissionsService.create({
          groupId: group.id,
          permissionId,
        });
      }),
    );

    return item.toObject();
  }

  public async update(
    id: number,
    payload: GroupUpdateRequestDto,
  ): Promise<GroupUpdateResponseDto> {
    const { name, permissionIds, userIds } = payload;

    const item = await this.groupRepository
      .update(
        GroupEntity.initialize({
          id,
          name,
          key: changeStringCase({
            stringToChange: name,
            caseType: StringCase.SNAKE_CASE,
          }),
        }),
      )
      .catch(() => {
        throw new GroupError({
          status: HttpCode.BAD_REQUEST,
          message: ExceptionMessage.INVALID_GROUP_NAME,
        });
      });

    await this.groupsToPermissionsService
      .update({
        groupId: id,
        permissionIds,
      })
      .catch(() => {
        throw new GroupError({
          status: HttpCode.BAD_REQUEST,
          message: ExceptionMessage.INVALID_GROUP_PERMISSIONS,
        });
      });

    await this.usersToGroupsService
      .update({
        groupId: id,
        userIds,
      })
      .catch(() => {
        throw new GroupError({
          status: HttpCode.BAD_REQUEST,
          message: ExceptionMessage.INVALID_GROUP_USERS,
        });
      });

    return item.toObject();
  }

  public async delete(id: number): Promise<boolean> {
    const deletedCount = await this.groupRepository.delete(id);

    return Boolean(deletedCount);
  }
}

export { GroupService };
