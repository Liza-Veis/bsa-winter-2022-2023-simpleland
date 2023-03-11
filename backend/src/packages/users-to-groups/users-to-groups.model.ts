import {
  AbstractModel,
  DatabaseTableName,
} from '~/libs/packages/database/database.js';

class UsersToGroupsModel extends AbstractModel {
  public 'userId': number;

  public 'groupId': number;

  public static override get tableName(): string {
    return DatabaseTableName.USERS_TO_GROUPS;
  }
}

export { UsersToGroupsModel };
