import { type Knex } from 'knex';

const TableName = {
  USERS_TO_GROUPS: 'users_to_groups',
  USERS: 'users',
  GROUPS: 'groups',
};

const ColumnName = {
  ID: 'id',
  USER_ID: 'user_id',
  GROUP_ID: 'group_id',
};

const onDeleteParameter = 'CASCADE';

function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TableName.USERS_TO_GROUPS, (table) => {
    table
      .integer(ColumnName.USER_ID)
      .references(ColumnName.ID)
      .inTable(TableName.USERS)
      .onDelete(onDeleteParameter);
    table
      .integer(ColumnName.GROUP_ID)
      .references(ColumnName.ID)
      .inTable(TableName.GROUPS)
      .onDelete(onDeleteParameter);

    table.unique([ColumnName.USER_ID, ColumnName.GROUP_ID]);
  });
}

function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TableName.USERS_TO_GROUPS, (table) => {
    table.dropColumn(ColumnName.USER_ID);
    table.dropColumn(ColumnName.GROUP_ID);
    table.dropUnique([ColumnName.USER_ID, ColumnName.GROUP_ID]);
  });
}

export { down, up };
