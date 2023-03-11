import { type IRepository } from '~/libs/interfaces/interfaces.js';
import { GroupsToPermissionsEntity } from '~/packages/groups-to-permissions/groups-to-permissions.entity.js';
import { type GroupsToPermissionsModel } from '~/packages/groups-to-permissions/groups-to-permissions.model.js';

class GroupsToPermissionsRepository
  implements Omit<IRepository, 'findAll' | 'findById' | 'update'>
{
  private groupsToPermissionsModel: typeof GroupsToPermissionsModel;

  public constructor(
    groupsToPermissionsModel: typeof GroupsToPermissionsModel,
  ) {
    this.groupsToPermissionsModel = groupsToPermissionsModel;
  }

  public async findByGroupId(
    groupId: number,
  ): Promise<GroupsToPermissionsEntity[]> {
    const groupsToPermissions = await this.groupsToPermissionsModel
      .query()
      .select()
      .where({ groupId });

    return groupsToPermissions.map((it) =>
      GroupsToPermissionsEntity.initialize(it),
    );
  }

  public async create(
    entity: GroupsToPermissionsEntity,
  ): Promise<GroupsToPermissionsEntity> {
    const { groupId, permissionId } = entity.toNewObject();

    const item = await this.groupsToPermissionsModel
      .query()
      .insert({
        groupId,
        permissionId,
      })
      .onConflict(['groupId', 'permissionId'])
      .ignore()
      .returning('*')
      .execute();

    return GroupsToPermissionsEntity.initialize(item);
  }

  public async delete(id: number): Promise<boolean> {
    const deletedCount = await this.groupsToPermissionsModel
      .query()
      .deleteById(id)
      .execute();

    return Boolean(deletedCount);
  }
}

export { GroupsToPermissionsRepository };
