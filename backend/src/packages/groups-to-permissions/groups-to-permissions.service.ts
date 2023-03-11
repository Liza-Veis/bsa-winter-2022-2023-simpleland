import { GroupsToPermissionsEntity } from '~/packages/groups-to-permissions/groups-to-permissions.entity.js';
import { type GroupsToPermissionsRepository } from '~/packages/groups-to-permissions/groups-to-permissions.repository.js';

import {
  type GroupsToPermissionsCreateRequestDto,
  type GroupsToPermissionsCreateResponseDto,
  type GroupsToPermissionsGetAllByGroupIdResponseDto,
  type GroupsToPermissionsUpdateRequestDto,
} from './libs/types/types.js';

class GroupsToPermissionsService {
  private groupsToPermissionsRepository: GroupsToPermissionsRepository;

  public constructor(
    groupsToPermissionsRepository: GroupsToPermissionsRepository,
  ) {
    this.groupsToPermissionsRepository = groupsToPermissionsRepository;
  }

  public async findByGroupId(
    id: number,
  ): Promise<GroupsToPermissionsGetAllByGroupIdResponseDto> {
    const items = await this.groupsToPermissionsRepository.findByGroupId(id);

    return {
      items: items.map((it) => it.toObject()),
    };
  }

  public async create(
    payload: GroupsToPermissionsCreateRequestDto,
  ): Promise<GroupsToPermissionsCreateResponseDto> {
    const item = await this.groupsToPermissionsRepository.create(
      GroupsToPermissionsEntity.initializeNew({
        groupId: payload.groupId,
        permissionId: payload.permissionId,
      }),
    );

    return item.toObject();
  }

  public async update(
    payload: GroupsToPermissionsUpdateRequestDto,
  ): Promise<void> {
    const { groupId, permissionIds } = payload;

    const items = await this.groupsToPermissionsRepository.findByGroupId(
      groupId,
    );
    const groupsToPermissions = items.map((it) => it.toObject());

    await Promise.all(
      permissionIds
        .filter(
          (permissionId) =>
            !groupsToPermissions.some((it) => permissionId === it.permissionId),
        )
        .map((permissionId) =>
          this.groupsToPermissionsRepository.create(
            GroupsToPermissionsEntity.initializeNew({
              permissionId,
              groupId,
            }),
          ),
        ),
    );

    await Promise.all(
      groupsToPermissions
        .filter((it) => !permissionIds.includes(it.permissionId))
        .map((it) => this.groupsToPermissionsRepository.delete(it.id)),
    );
  }
}

export { GroupsToPermissionsService };
