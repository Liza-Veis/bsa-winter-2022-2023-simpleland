import { type Knex } from 'knex';

const TableName = {
  GROUPS_TO_PERMISSIONS: 'groups_to_permissions',
  GROUPS: 'groups',
  PERMISSIONS: 'permissions',
};

const ColumnName = {
  ID: 'id',
  GROUP_ID: 'group_id',
  PERMISSION_ID: 'permission_id',
};

const onDeleteParameter = 'CASCADE';

function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TableName.GROUPS_TO_PERMISSIONS, (table) => {
    table
      .integer(ColumnName.GROUP_ID)
      .references(ColumnName.ID)
      .inTable(TableName.GROUPS)
      .onDelete(onDeleteParameter);
    table
      .integer(ColumnName.PERMISSION_ID)
      .references(ColumnName.ID)
      .inTable(TableName.PERMISSIONS)
      .onDelete(onDeleteParameter);

    table.unique([ColumnName.GROUP_ID, ColumnName.PERMISSION_ID]);
  });
}

function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TableName.GROUPS_TO_PERMISSIONS, (table) => {
    table.dropColumn(ColumnName.GROUP_ID);
    table.dropColumn(ColumnName.PERMISSION_ID);
    table.dropUnique([ColumnName.GROUP_ID, ColumnName.PERMISSION_ID]);
  });
}

export { down, up };
