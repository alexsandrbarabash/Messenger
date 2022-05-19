import {
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class Users {
  @IsUUID()
  userId: string;

  @IsOptional()
  @IsUUID()
  roleId?: string;
}

export class CreateChatDto {
  @IsString()
  title: string;

  @IsUUID()
  ownerId: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Users)
  users?: Users[];
}
