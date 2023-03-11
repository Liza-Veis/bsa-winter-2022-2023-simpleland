import { type IEntity } from '~/libs/interfaces/interfaces.js';

class GroupsToPermissionsEntity implements IEntity {
  private 'id': number | null;

  private 'groupId': number;

  private 'permissionId': number;

  private constructor({
    id,
    groupId,
    permissionId,
  }: {
    id: number | null;
    groupId: number;
    permissionId: number;
  }) {
    this.id = id;
    this.groupId = groupId;
    this.permissionId = permissionId;
  }

  public static initialize({
    id,
    groupId,
    permissionId,
  }: {
    id: number;
    groupId: number;
    permissionId: number;
  }): GroupsToPermissionsEntity {
    return new GroupsToPermissionsEntity({
      id,
      groupId,
      permissionId,
    });
  }

  public static initializeNew({
    groupId,
    permissionId,
  }: {
    groupId: number;
    permissionId: number;
  }): GroupsToPermissionsEntity {
    return new GroupsToPermissionsEntity({
      id: null,
      groupId,
      permissionId,
    });
  }

  public toObject(): {
    id: number;
    groupId: number;
    permissionId: number;
  } {
    return {
      id: this.id as number,
      groupId: this.groupId,
      permissionId: this.permissionId,
    };
  }

  public toNewObject(): {
    groupId: number;
    permissionId: number;
  } {
    return {
      groupId: this.groupId,
      permissionId: this.permissionId,
    };
  }
}

export { GroupsToPermissionsEntity };
