import {
  Controller,
  Get,
  Query,
  Param,
  UseGuards,
  Req,
  Post,
} from '@nestjs/common';

import { JwtAuthenticationGuard } from 'src/common/guards';
import { ChatsService } from '../services';
import { IChatResponse, IChatsWithRelationResponse } from '../types';
import {
  ChatListPaginationDto,
  SearchChatParamsDto,
  CreateChatDto,
} from '../dto';
import { ChatsMappers } from '../mappers';
import { IRequestWithUser } from '../../users/types';

@UseGuards(JwtAuthenticationGuard)
@Controller('chats')
export class ChatsController {
  constructor(private readonly _chatsService: ChatsService) {}

  @Get('/chats-list')
  public async getChats(
    @Query() chatListPaginationDto: ChatListPaginationDto,
  ): Promise<IChatResponse[]> {
    return this._chatsService.getChats(chatListPaginationDto);
  }

  @Get('/chats-list/:id')
  public async getChat(
    @Param() searchChatParamsDto: SearchChatParamsDto,
  ): Promise<IChatResponse> {
    return this._chatsService.getChat(searchChatParamsDto.id);
  }

  @Get('/my-list')
  public async getChatsByUser(
    @Req() req: IRequestWithUser,
  ): Promise<IChatResponse[]> {
    const data = await this._chatsService.getChatsByUser(req.user.id);
    return ChatsMappers.formatUserChatsToReponse(data);
  }

  @Get('/chat-data/:id')
  public async getChatData(
    @Param() searchChatParamsDto: SearchChatParamsDto,
  ): Promise<IChatsWithRelationResponse> {
    const data = await this._chatsService.getChatData(searchChatParamsDto.id);
    return ChatsMappers.formatChatDataToResponse(data);
  }
}
