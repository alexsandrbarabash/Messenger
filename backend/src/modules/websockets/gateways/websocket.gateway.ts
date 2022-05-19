import {
  WebSocketGateway,
  OnGatewayConnection,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';

import { UsersService } from '../../users/services';
import { ChatsService } from '../../chats/services';
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

  constructor(
    private readonly _usersService: UsersService,
    private readonly _chatsService: ChatsService,
    private readonly _websocketService: WebsocketService,
  ) {}

  public async handleConnection(socket: Socket): Promise<void> {
    try {
      console.log(socket.id);
      const user = await this._usersService.getUserFromSocket(
        socket.handshake.headers.authorization,
      );

      if (!user) {
        this._logger.error('Not allow connect');
        socket.disconnect();
        return;
      }

      this._logger.log(`User with id:${user.id} connect`);
      const chats = await this._chatsService.getMyChat(user.id);
      chats.forEach((item) => {
        socket.join(item.chatId);
      });
    } catch (error) {
      this._logger.error('Not allow connect');
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
    console.log('sdfsd 1');
    const data = await this._websocketService.createChat(createChatDto);
    console.log('sdfsd 2');
    const users: string[] =
      createChatDto.users?.map((item) => item.userId) || [];
    console.log('sdfsd');
    users.push(createChatDto.ownerId);

    users.forEach((item) => {
      socket.to(item).emit('join-to-chat', data);
      socket.emit('join-to-chat', data);
    });
  }

  @SubscribeMessage('write-message')
  public async handleWriteMessage(
    @MessageBody() writeMessageDto: WriteMessageDto,
    @ConnectedSocket() socket: Socket,
  ): Promise<void> {
    const message = await this._websocketService.writeMessage(writeMessageDto);
    socket.to(writeMessageDto.chatId).emit('write-message', message);
  }
}
