import { type IRepository } from '~/libs/interfaces/interfaces.js';
import { UsersToGroupsEntity } from '~/packages/users-to-groups/users-to-groups.entity.js';
import { type UsersToGroupsModel } from '~/packages/users-to-groups/users-to-groups.model.js';

class UsersToGroupsRepository
  implements Omit<IRepository, 'findAll' | 'findById' | 'update'>
{
  private usersToGroupsModel: typeof UsersToGroupsModel;

  public constructor(usersToGroupsModel: typeof UsersToGroupsModel) {
    this.usersToGroupsModel = usersToGroupsModel;
  }

  public async findByGroupId(groupId: number): Promise<UsersToGroupsEntity[]> {
    const usersToGroups = await this.usersToGroupsModel
      .query()
      .select()
      .where({ groupId });

    return usersToGroups.map((it) => UsersToGroupsEntity.initialize(it));
  }

  public async create(
    entity: UsersToGroupsEntity,
  ): Promise<UsersToGroupsEntity> {
    const { userId, groupId } = entity.toNewObject();

    const item = await this.usersToGroupsModel
      .query()
      .insert({
        userId,
        groupId,
      })
      .onConflict(['userId', 'groupId'])
      .ignore()
      .returning('*')
      .execute();

    return UsersToGroupsEntity.initialize(item);
  }

  public async delete(id: number): Promise<boolean> {
    const deletedCount = await this.usersToGroupsModel
      .query()
      .deleteById(id)
      .execute();

    return Boolean(deletedCount);
  }
}

export { UsersToGroupsRepository };
