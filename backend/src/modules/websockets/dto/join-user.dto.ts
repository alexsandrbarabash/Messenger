import { IsUUID } from 'class-validator';

export class JoinUserDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  chatId: string;
}
