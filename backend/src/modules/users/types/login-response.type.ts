import { IUserResponse } from './user-response.interface';
import { ITokens } from './tokens.interface';

export type LoginResponse = IUserResponse & ITokens;
