import joi from 'joi';

import { type GroupUpdateRequestDto } from '../types/types.js';

const groupUpdate = joi.object<GroupUpdateRequestDto, true>({
  name: joi.string().required(),
  userIds: joi.array().items(joi.number()).required(),
  permissionIds: joi.array().items(joi.number()).required(),
});

export { groupUpdate };
