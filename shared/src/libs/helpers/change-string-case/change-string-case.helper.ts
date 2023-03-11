import { snakeCase } from 'change-case';

import { StringCase } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

const caseTypeToFunction = {
  [StringCase.SNAKE_CASE]: snakeCase,
};

type Parameters = {
  stringToChange: string;
  caseType: ValueOf<typeof StringCase>;
};

const changeStringCase = (arguments_: Parameters): string => {
  const getChangedStringCase = caseTypeToFunction[arguments_.caseType];

  return getChangedStringCase(arguments_.stringToChange);
};

export { changeStringCase };
