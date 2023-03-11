import { type HttpCode, HttpError } from '~/libs/packages/http/http.js';
import { type ValueOf } from '~/libs/types/types.js';

type Constructor = {
  message: string;
  status: ValueOf<typeof HttpCode>;
  cause?: unknown;
};

class PermissionError extends HttpError {
  public status: ValueOf<typeof HttpCode>;

  public constructor({ message, cause, status }: Constructor) {
    super({
      message,
      cause,
      status,
    });

    this.status = status;
  }
}

export { PermissionError };
