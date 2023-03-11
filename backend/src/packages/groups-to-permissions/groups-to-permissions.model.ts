import {
  AbstractModel,
  DatabaseTableName,
} from '~/libs/packages/database/database.js';

class GroupsToPermissionsModel extends AbstractModel {
  public 'groupId': number;

  public 'permissionId': number;

  public static override get tableName(): string {
    return DatabaseTableName.GROUPS_TO_PERMISSIONS;
  }
}

export { GroupsToPermissionsModel };
