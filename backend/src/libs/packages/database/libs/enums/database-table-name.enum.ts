const DatabaseTableName = {
  MIGRATIONS: 'migrations',
  USERS: 'users',
  PERMISSIONS: 'permissions',
  GROUPS: 'groups',
  GROUPS_TO_PERMISSIONS: 'groups_to_permissions',
  USERS_TO_GROUPS: 'users_to_groups',
} as const;

export { DatabaseTableName };
