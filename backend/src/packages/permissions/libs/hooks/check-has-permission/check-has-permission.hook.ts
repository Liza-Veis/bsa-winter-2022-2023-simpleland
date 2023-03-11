import { type PermissionKey } from '../../enums/enums.js';
import { ExceptionMessage, HttpCode } from '../../enums/enums.js';
import { PermissionError } from '../../exceptions/exceptions.js';
import { type ValueOf } from '../../types/types.js';

const checkHasPermissions =
  (permissions: ValueOf<typeof PermissionKey>[]) => (): void => {
    // TODO implement authorization
    const user = {
      permissions: [] as ValueOf<typeof PermissionKey>[],
    };
    const hasUser = Boolean(user);

    if (!hasUser) {
      throw new PermissionError({
        message: ExceptionMessage.PERMISSION_LACK,
        status: HttpCode.FORBIDDEN,
      });
    }

    const hasUserAllPermissions = permissions.every((permission) => {
      return user.permissions.includes(permission);
    });

    if (!hasUserAllPermissions) {
      throw new PermissionError({
        message: ExceptionMessage.PERMISSION_LACK,
        status: HttpCode.FORBIDDEN,
      });
    }
  };

export { checkHasPermissions };
