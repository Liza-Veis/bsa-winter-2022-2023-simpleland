import { type IService } from '~/libs/interfaces/interfaces.js';
import { type PermissionRepository } from '~/packages/permissions/permission.repository.js';

import {
  type PermissionGetAllResponseDto,
  type PermissionGetByIdsResponseDto,
} from './libs/types/types.js';

class PermissionService implements IService {
  private permissionRepository: PermissionRepository;

  public constructor(permissionRepository: PermissionRepository) {
    this.permissionRepository = permissionRepository;
  }

  public async findAll(): Promise<PermissionGetAllResponseDto> {
    const items = await this.permissionRepository.findAll();

    return {
      items: items.map((it) => it.toObject()),
    };
  }

  public async findByIds(
    ids: number[],
  ): Promise<PermissionGetByIdsResponseDto> {
    const items = await this.permissionRepository.findByIds(ids);

    return {
      items: items.map((it) => it.toObject()),
    };
  }
}

export { PermissionService };
