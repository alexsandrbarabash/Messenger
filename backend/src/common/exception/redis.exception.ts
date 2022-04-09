import { HttpException, HttpStatus } from '@nestjs/common';

export class RedisException extends HttpException {
  constructor(errorText: string, error: any) {
    super(
      { message: errorText },
      error.status || HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
