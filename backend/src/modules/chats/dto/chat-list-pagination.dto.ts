import { IsNumber, IsPositive, IsOptional } from 'class-validator';

export class ChatListPaginationDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  skip?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  take?: number;
}
