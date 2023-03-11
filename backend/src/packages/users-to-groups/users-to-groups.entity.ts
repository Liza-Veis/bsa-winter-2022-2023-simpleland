import { type IEntity } from '~/libs/interfaces/interfaces.js';

class UsersToGroupsEntity implements IEntity {
  private 'id': number | null;

  private 'userId': number;

  private 'groupId': number;

  private constructor({
    id,
    userId,
    groupId,
  }: {
    id: number | null;
    userId: number;
    groupId: number;
  }) {
    this.id = id;
    this.userId = userId;
    this.groupId = groupId;
  }

  public static initialize({
    id,
    userId,
    groupId,
  }: {
    id: number;
    userId: number;
    groupId: number;
  }): UsersToGroupsEntity {
    return new UsersToGroupsEntity({
      id,
      userId,
      groupId,
    });
  }

  public static initializeNew({
    userId,
    groupId,
  }: {
    userId: number;
    groupId: number;
  }): UsersToGroupsEntity {
    return new UsersToGroupsEntity({
      id: null,
      userId,
      groupId,
    });
  }

  public toObject(): {
    id: number;
    userId: number;
    groupId: number;
  } {
    return {
      id: this.id as number,
      userId: this.userId,
      groupId: this.groupId,
    };
  }

  public toNewObject(): {
    userId: number;
    groupId: number;
  } {
    return {
      userId: this.userId,
      groupId: this.groupId,
    };
  }
}

export { UsersToGroupsEntity };
