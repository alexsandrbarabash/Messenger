export interface IJoinUserEmitData {
  id: string;
  firstName: string | null;
  lastName: string | null;
  username: string;
  password: string | null;
  avatar: string | null;
  isBot: boolean;
  token: string | null;
  createdAt: Date;
  chatId: string;
}
