import { useEffect, useState, useCallback } from 'react';
import io, { Socket } from 'socket.io-client';
import { useStore } from 'effector-react';

import { userStore, addChat, addMessages } from '../stores';
import { IChatCard, IMessages } from '../types';
import { SocketEvent } from '../enums';

let socket: Socket | null = null;

export const useWebsocket = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { accessToken, id } = useStore(userStore);

  useEffect(() => {
    if (!socket?.connected) {
      socket = io(process.env.REACT_APP_BACKEND_URL!, {
        extraHeaders: {
          authorization: accessToken
        }
      });
      socket.on(SocketEvent.CONNECT, () => {
        console.log('CONNECT');
      });

      socket.on(SocketEvent.DISCONNECT, () => {
        console.log('DISCONNECT');
      });

      socket.on(SocketEvent.JOIN_USER, () => {
        console.log('JOIN_USER');
      });

      socket.on(SocketEvent.WRITE_MESSAGE, (messages: IMessages) => {
        addMessages(messages);
      });

      socket.on(SocketEvent.JOIN_TO_CHAT, (data: IChatCard) => {
        socket?.emit(SocketEvent.CONNECT_ME_TO_CHAT, { chatId: data.id });
        addChat(data);
      });
      setLoading(false);
    }

    return () => {
      if (!accessToken) {
        socket?.disconnect();
      }
    };
  }, [accessToken]);

  const writeMessage = useCallback(
    ({ text, chatId }: { text: string; chatId: string }) => {
      socket?.emit(SocketEvent.WRITE_MESSAGE, { text, chatId, userId: id });
    },
    [socket, id]
  );

  const createChat = useCallback(
    ({
      title,
      users
    }: {
      title: string;
      users?: { userId: string; roleId?: string }[];
    }) => {
      socket?.emit(SocketEvent.CREATE_CHAT, { title, users, ownerId: id });
    },
    [socket, id]
  );

  return { writeMessage, createChat, loading };
};
