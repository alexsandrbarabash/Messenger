import { Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module';
import { ChatsModule } from '../chats/chats.module';
import { MessagesModule } from '../messages/messages.module';
import { WebsocketGateway } from './gateways';
import { WebsocketService } from './services';

@Module({
  imports: [UsersModule, ChatsModule, MessagesModule],
  providers: [WebsocketGateway, WebsocketService],
})
export class WebsocketModule {}
