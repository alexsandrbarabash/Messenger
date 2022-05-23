import { useState, useEffect } from 'react';
import { useStore } from 'effector-react';

import { userStore, messagesStore, loadMessages } from '../stores';
import { ChatsApiHandler } from '../api';

export const useChatData = (chatId: string = '') => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');

  const { accessToken } = useStore(userStore);
  const { messages } = useStore(messagesStore);

  const loadChatData = async () => {
    setLoading(true);
    const api = new ChatsApiHandler(accessToken);
    const data = await api.getChatData(chatId);
    setTitle(data.title);
    loadMessages(data.messages);
    setLoading(false);
  };

  useEffect(() => {
    if (chatId) {
      loadChatData();
    }
  }, [chatId]);

  return { loading, title, messages };
};
