import { IsString, IsNotEmpty } from 'class-validator';

export class CreateChatDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString({ each: true })
  users: string[];
}
