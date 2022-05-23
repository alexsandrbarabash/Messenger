export interface ITokenPayloadAccess {
  userId: string;
}

export interface ITokenPayloadRefresh {
  userId: string;
  tokenId: string;
}
