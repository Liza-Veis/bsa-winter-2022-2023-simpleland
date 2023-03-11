import { ApiPath } from '~/libs/enums/enums.js';
import {
  type ApiHandlerResponse,
  Controller,
} from '~/libs/packages/controller/controller.js';
import { HttpCode } from '~/libs/packages/http/http.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';
import { type PermissionService } from '~/packages/permissions/permission.service.js';

import { PermissionsApiPath } from './libs/enums/enums.js';

/**
 * @swagger
 * components:
 *    schemas:
 *      Permission:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            format: number
 *            minimum: 1
 *          name:
 *            type: string
 *            format: string
 *          key:
 *            type: string
 *            format: string
 */
class PermissionController extends Controller {
  private permissionService: PermissionService;

  public constructor(logger: ILogger, permissionService: PermissionService) {
    super(logger, ApiPath.PERMISSIONS);

    this.permissionService = permissionService;

    this.addRoute({
      path: PermissionsApiPath.ROOT,
      method: 'GET',
      handler: () => this.findAll(),
    });
  }

  /**
   * @swagger
   * /permissions:
   *    get:
   *      description: Returns an array of permissions
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Permission'
   */
  private async findAll(): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.permissionService.findAll(),
    };
  }
}

export { PermissionController };
