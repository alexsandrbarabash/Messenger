import { IsUUID } from 'class-validator';

export class ConnectMeToChatDto {
  @IsUUID()
  chatId: string;
}