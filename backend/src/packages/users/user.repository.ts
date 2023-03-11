import { type IRepository } from '~/libs/interfaces/interfaces.js';
import { UserEntity } from '~/packages/users/user.entity.js';
import { type UserModel } from '~/packages/users/user.model.js';

class UserRepository implements IRepository {
  private userModel: typeof UserModel;

  public constructor(userModel: typeof UserModel) {
    this.userModel = userModel;
  }

  public async findAll(): Promise<UserEntity[]> {
    const items = await this.userModel.query().execute();

    return items.map((it) => UserEntity.initialize(it));
  }

  public async findByIds(ids: number[]): Promise<UserEntity[]> {
    const item = await this.userModel.query().findByIds(ids).execute();

    return item.map((it) => UserEntity.initialize(it));
  }

  public async create(entity: UserEntity): Promise<UserEntity> {
    const { email, passwordSalt, passwordHash } = entity.toNewObject();

    const item = await this.userModel
      .query()
      .insert({
        email,
        passwordSalt,
        passwordHash,
      })
      .returning('*')
      .execute();

    return UserEntity.initialize(item);
  }
}

export { UserRepository };
