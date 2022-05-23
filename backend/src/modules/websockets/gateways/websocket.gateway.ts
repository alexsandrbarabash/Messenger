import {
  WebSocketGateway,
  OnGatewayConnection,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Logger, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

import {
  JoinUserDto,
  CreateChatDto,
  ConnectMeToChatDto,
  WriteMessageDto,
} from '../dto';
import { WebsocketService } from '../services';
import { WsExceptionFilter } from '../../../common/filters';

@UseFilters(WsExceptionFilter)
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WebsocketGateway implements OnGatewayConnection {
  private readonly _logger = new Logger('WEB_SOCKET');

  @WebSocketServer()
  private readonly _server: Server;

  constructor(private readonly _websocketService: WebsocketService) {}

  public async handleConnection(socket: Socket): Promise<void> {
    try {
      const { chats, id } = await this._websocketService.connectUser({
        token: socket.handshake.headers.authorization,
      });

      this._logger.log(`User with id:${id} connect`);
      chats.forEach((item) => {
        socket.join(item.chatId);
      });

      /**
       * Join user to his own room
       */
      socket.join(id);
    } catch (error) {
      this._logger.error('Not allow connect user');
      socket.disconnect();
    }
  }

  @SubscribeMessage('connect-me-to-chat')
  public handleConnectMeToChat(
    @MessageBody() connectMeToChatDto: ConnectMeToChatDto,
    @ConnectedSocket() socket: Socket,
  ): void {
    socket.join(connectMeToChatDto.chatId);
  }

  @SubscribeMessage('join-user')
  public async handleJoinUser(
    @MessageBody() joinUserDto: JoinUserDto,
    @ConnectedSocket() socket: Socket,
  ): Promise<void> {
    const data = await this._websocketService.joinUser(joinUserDto);
    socket.to(joinUserDto.chatId).emit('join-user', data);
  }

  @SubscribeMessage('create-chat')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  )
  public async handleCreateChat(
    @MessageBody() createChatDto: CreateChatDto,
    @ConnectedSocket() socket: Socket,
  ): Promise<void> {
    const data = await this._websocketService.createChat(createChatDto);
    const users: string[] =
      createChatDto.users?.map((item) => item.userId) || [];
    users.push(createChatDto.ownerId);

    socket.to(users).emit('join-to-chat', data);

    /**
     * Send to device response
     */
    socket.emit('join-to-chat', data);
  }

  @SubscribeMessage('write-message')
  public async handleWriteMessage(
    @MessageBody() writeMessageDto: WriteMessageDto,
    @ConnectedSocket() socket: Socket,
  ): Promise<void> {
    const message = await this._websocketService.writeMessage(writeMessageDto);
    socket.to(writeMessageDto.chatId).emit('write-message', message);

    /**
     * Send to device response
     */
    socket.emit('write-message', message);
  }
}
