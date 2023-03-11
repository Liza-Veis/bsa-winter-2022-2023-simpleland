import { type IRepository } from '~/libs/interfaces/interfaces.js';
import { PermissionEntity } from '~/packages/permissions/permission.entity.js';
import { type PermissionModel } from '~/packages/permissions/permission.model.js';

class PermissionRepository implements IRepository {
  private permissionModel: typeof PermissionModel;

  public constructor(permissionModel: typeof PermissionModel) {
    this.permissionModel = permissionModel;
  }

  public async findAll(): Promise<PermissionEntity[]> {
    const items = await this.permissionModel.query().execute();

    return items.map((it) => PermissionEntity.initialize(it));
  }

  public async findByIds(ids: number[]): Promise<PermissionEntity[]> {
    const items = await this.permissionModel.query().findByIds(ids).execute();

    return items.map((it) => PermissionEntity.initialize(it));
  }
}

export { PermissionRepository };
