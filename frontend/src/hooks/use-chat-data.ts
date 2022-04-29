import { useState, useEffect } from 'react';
import { useStore } from 'effector-react';

import { userStore } from '../stores';
import { IMessages } from '../types';
import { ChatsApiHandler } from '../api';

export const useChatData = (chatId: string = '') => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [messages, setMessages] = useState<IMessages[]>([]);

  const { accessToken } = useStore(userStore);

  const loadChatData = async () => {
    setLoading(true);
    const api = new ChatsApiHandler(accessToken);
    const data = await api.getChatData(chatId);
    setTitle(data.title);
    setMessages(data.messages);
    setLoading(false);
  };

  useEffect(() => {
    if (chatId) {
      loadChatData();
    }
  }, [chatId]);

  return { loading, title, messages };
};
