import { UsersToGroupsEntity } from '~/packages/users-to-groups/users-to-groups.entity.js';
import { type UsersToGroupsRepository } from '~/packages/users-to-groups/users-to-groups.repository.js';

import {
  type UsersToGroupsCreateRequestDto,
  type UsersToGroupsCreateResponseDto,
  type UsersToGroupsGetAllByGroupIdResponseDto,
  type UsersToGroupsUpdateRequestDto,
} from './libs/types/types.js';

class UsersToGroupsService {
  private usersToGroupsRepository: UsersToGroupsRepository;

  public constructor(usersToGroupsRepository: UsersToGroupsRepository) {
    this.usersToGroupsRepository = usersToGroupsRepository;
  }

  public async findByGroupId(
    id: number,
  ): Promise<UsersToGroupsGetAllByGroupIdResponseDto> {
    const items = await this.usersToGroupsRepository.findByGroupId(id);

    return {
      items: items.map((it) => it.toObject()),
    };
  }

  public async create(
    payload: UsersToGroupsCreateRequestDto,
  ): Promise<UsersToGroupsCreateResponseDto> {
    const item = await this.usersToGroupsRepository.create(
      UsersToGroupsEntity.initializeNew({
        userId: payload.userId,
        groupId: payload.groupId,
      }),
    );

    return item.toObject();
  }

  public async update(payload: UsersToGroupsUpdateRequestDto): Promise<void> {
    const { groupId, userIds } = payload;

    const items = await this.usersToGroupsRepository.findByGroupId(groupId);
    const usersToGroups = items.map((it) => it.toObject());

    await Promise.all(
      userIds
        .filter((userId) => !usersToGroups.some((it) => userId === it.userId))
        .map((userId) =>
          this.usersToGroupsRepository.create(
            UsersToGroupsEntity.initializeNew({
              userId,
              groupId,
            }),
          ),
        ),
    );

    await Promise.all(
      usersToGroups
        .filter((it) => !userIds.includes(it.userId))
        .map((it) => this.usersToGroupsRepository.delete(it.id)),
    );
  }
}

export { UsersToGroupsService };
