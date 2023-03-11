import { type IRepository } from '~/libs/interfaces/interfaces.js';
import { GroupEntity } from '~/packages/groups/group.entity.js';
import { type GroupModel } from '~/packages/groups/group.model.js';

class GroupRepository implements IRepository {
  private groupModel: typeof GroupModel;

  public constructor(groupModel: typeof GroupModel) {
    this.groupModel = groupModel;
  }

  public async findAll(): Promise<GroupEntity[]> {
    const items = await this.groupModel.query().execute();

    return items.map((it) => GroupEntity.initialize(it));
  }

  public async findById(id: number): Promise<GroupEntity | null> {
    const item = await this.groupModel.query().findById(id).execute();

    return item ? GroupEntity.initialize(item) : null;
  }

  public async findByName(name: string): Promise<GroupEntity | null> {
    const item = await this.groupModel.query().where({ name }).first();

    return item ? GroupEntity.initialize(item) : null;
  }

  public async create(entity: GroupEntity): Promise<GroupEntity> {
    const { name, key } = entity.toNewObject();

    const item = await this.groupModel
      .query()
      .insert({
        name,
        key,
      })
      .returning('*')
      .execute();

    return GroupEntity.initialize(item);
  }

  public async update(entity: GroupEntity): Promise<GroupEntity> {
    const { id, name, key } = entity.toObject();

    const item = await this.groupModel
      .query()
      .updateAndFetchById(id, {
        name,
        key,
      })
      .execute();

    return GroupEntity.initialize(item);
  }

  public async delete(id: number): Promise<boolean> {
    const deletedCount = await this.groupModel.query().deleteById(id).execute();

    return Boolean(deletedCount);
  }
}

export { GroupRepository };
