import { IsString, IsUUID } from 'class-validator';

export class WriteMessageDto {
  @IsString()
  text: string;

  @IsUUID()
  chatId: string;

  @IsUUID()
  userId: string;
}
