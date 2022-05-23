import { createContext } from 'react';

import { IWebsocketContext } from '../types';

export const WebsocketContext = createContext<IWebsocketContext>({
  createChat: ({
    title,
    users
  }: {
    title: string;
    users?: { userId: string; roleId?: string | undefined }[] | undefined;
  }) => {},
  writeMessage: ({ text, chatId }: { text: string; chatId: string }) => {}
});
