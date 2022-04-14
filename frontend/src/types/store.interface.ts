export interface IUserStore {
  isAuth: boolean;
  refreshToken: string;
  accessToken: string;
}

export interface IAlertStore {
  message: string;
  show: boolean;
}