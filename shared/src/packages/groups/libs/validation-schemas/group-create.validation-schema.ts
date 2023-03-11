import joi from 'joi';

import { type GroupCreateRequestDto } from '../types/types.js';

const groupCreate = joi.object<GroupCreateRequestDto, true>({
  name: joi.string().required(),
  userIds: joi.array().items(joi.number()).required(),
  permissionIds: joi.array().items(joi.number()).required(),
});

export { groupCreate };
