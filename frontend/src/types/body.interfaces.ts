export interface IRegisterBody {
  firstName: string;
  lastName?: string;
  username: string;
  password: string;
}

export interface ILogInBody {
  username: string;
  password: string;
}
