import { ArgumentsHost, Catch, HttpException, Logger } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Catch(WsException, HttpException)
export class WsExceptionFilter {
  private readonly _logger = new Logger('EXCEPTION');

  public catch(exception: HttpException, host: ArgumentsHost) {
    const client = host.switchToWs().getClient();
    this.handleError(client, exception);
  }

  public handleError(client: Socket, exception: HttpException | WsException) {
    this._logger.error(exception.stack);
    client.emit('error', exception.message);
    // throw new WsException(exception.message);
  }
}
