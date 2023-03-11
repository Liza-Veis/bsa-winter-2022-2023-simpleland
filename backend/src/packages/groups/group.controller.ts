import { ApiPath } from '~/libs/enums/enums.js';
import {
  type ApiHandlerOptions,
  type ApiHandlerResponse,
  Controller,
} from '~/libs/packages/controller/controller.js';
import { HttpCode } from '~/libs/packages/http/http.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';
import { type GroupService } from '~/packages/groups/group.service.js';

import { GroupsApiPath } from './libs/enums/enums.js';
import {
  type GroupCreateRequestDto,
  type GroupUpdateRequestDto,
} from './libs/types/types.js';

/**
 * @swagger
 * components:
 *    schemas:
 *      Group:
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
class GroupController extends Controller {
  private groupService: GroupService;

  public constructor(logger: ILogger, groupService: GroupService) {
    super(logger, ApiPath.GROUPS);

    this.groupService = groupService;

    this.addRoute({
      path: GroupsApiPath.ROOT,
      method: 'GET',
      handler: () => this.findAll(),
    });

    this.addRoute({
      path: GroupsApiPath.ID,
      method: 'GET',
      handler: (options) => {
        const { params } = options as ApiHandlerOptions<{
          params: { id: number };
        }>;

        return this.findById(params.id);
      },
    });

    this.addRoute({
      path: GroupsApiPath.ROOT,
      method: 'POST',
      handler: (options) => {
        const { body } = options as ApiHandlerOptions<{
          body: GroupCreateRequestDto;
        }>;

        return this.create(body);
      },
    });

    this.addRoute({
      path: GroupsApiPath.ID,
      method: 'PUT',
      handler: (options) => {
        const { params, body } = options as ApiHandlerOptions<{
          params: { id: number };
          body: GroupUpdateRequestDto;
        }>;

        return this.update(params.id, body);
      },
    });

    this.addRoute({
      path: GroupsApiPath.ID,
      method: 'DELETE',
      handler: (options) => {
        const { params } = options as ApiHandlerOptions<{
          params: { id: number };
        }>;

        return this.delete(params.id);
      },
    });
  }

  /**
   * @swagger
   * /groups:
   *    get:
   *      description: Returns an array of groups
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Group'
   */
  private async findAll(): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.groupService.findAll(),
    };
  }

  /**
   * @swagger
   * /groups:
   *    get:
   *      description: Returns a group by id
   *      parameters:
   *        - in: path
   *          name: id
   *          description: Group id
   *          required: true
   *          schema:
   *           type: integer
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                allOf:
   *                  - $ref: '#/components/schemas/Group'
   *                  - type: object
   *                    properties:
   *                      userIds:
   *                        schema:
   *                         type: array
   *                         items:
   *                           type: number
   *                      permissionIds:
   *                        schema:
   *                         type: array
   *                         items:
   *                           type: number
   */
  private async findById(id: number): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.groupService.findById(id),
    };
  }

  /**
   * @swagger
   * /groups:
   *    post:
   *      description: Creates a group
   *      responses:
   *        201:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                  $ref: '#/components/schemas/Group'
   */
  private async create(
    payload: GroupCreateRequestDto,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.CREATED,
      payload: await this.groupService.create(payload),
    };
  }

  /**
   * @swagger
   * /groups:
   *    put:
   *      description: Updates a group by id
   *      parameters:
   *        - in: path
   *          name: id
   *          required: true
   *          schema:
   *           type: integer
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                  $ref: '#/components/schemas/Group'
   */
  private async update(
    id: number,
    payload: GroupUpdateRequestDto,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.groupService.update(id, payload),
    };
  }

  /**
   * @swagger
   * /groups:
   *    delete:
   *      description: Deletes a group by id
   *      parameters:
   *        - in: path
   *          name: id
   *          required: true
   *          schema:
   *           type: integer
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                  type: boolean
   */
  private async delete(id: number): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.groupService.delete(id),
    };
  }
}

export { GroupController };
