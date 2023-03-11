import { type IEntity } from '~/libs/interfaces/interfaces.js';

class PermissionEntity implements IEntity {
  private 'id': number | null;

  private 'name': string;

  private 'key': string;

  private constructor({
    id,
    name,
    key,
  }: {
    id: number | null;
    name: string;
    key: string;
  }) {
    this.id = id;
    this.name = name;
    this.key = key;
  }

  public static initialize({
    id,
    name,
    key,
  }: {
    id: number;
    name: string;
    key: string;
  }): PermissionEntity {
    return new PermissionEntity({
      id,
      name,
      key,
    });
  }

  public static initializeNew({
    name,
    key,
  }: {
    name: string;
    key: string;
  }): PermissionEntity {
    return new PermissionEntity({
      id: null,
      name,
      key,
    });
  }

  public toObject(): {
    id: number;
    name: string;
    key: string;
  } {
    return {
      id: this.id as number,
      name: this.name,
      key: this.key,
    };
  }

  public toNewObject(): {
    name: string;
    key: string;
  } {
    return {
      name: this.name,
      key: this.key,
    };
  }
}

export { PermissionEntity };
