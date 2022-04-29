export interface IUserStore {
  isAuth: boolean;
  refreshToken: string;
  accessToken: string;
  id: string;
  firstName: string;
  lastName?: string;
  username: string;
  avatar?: string;
}

export interface IAlertStore {
  message: string;
  show: boolean;
}

export interface IChatStore {
  chatId: string;
  title: string;
}