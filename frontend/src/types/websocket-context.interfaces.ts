export interface IWebsocketContext {
  createChat: ({
    title,
    users
  }: {
    title: string;
    users?: { userId: string; roleId?: string | undefined }[] | undefined;
  }) => void;
  writeMessage: ({ text, chatId }: { text: string; chatId: string }) => void;
}
