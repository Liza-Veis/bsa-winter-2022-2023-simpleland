import {
  AbstractModel,
  DatabaseTableName,
} from '~/libs/packages/database/database.js';

class GroupModel extends AbstractModel {
  public 'name': string;

  public 'key': string;

  public static override get tableName(): string {
    return DatabaseTableName.GROUPS;
  }
}

export { GroupModel };
