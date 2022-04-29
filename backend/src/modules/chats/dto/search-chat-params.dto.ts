import { IsUUID } from 'class-validator';

export class SearchChatParamsDto {
  @IsUUID()
  id: string;
}
