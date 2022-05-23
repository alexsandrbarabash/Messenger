import { useState, useEffect, useCallback } from 'react';
import { useStore } from 'effector-react';

import { userStore, chatListStore, loadChats } from '../stores';
import { ChatsApiHandler } from '../api';

export const useChatList = () => {
  const [loading, setLoading] = useState(false);

  const { accessToken } = useStore(userStore);
  const { chats } = useStore(chatListStore);

  const loadAllMyChats = useCallback(async () => {
    setLoading(true);
    const api = new ChatsApiHandler(accessToken);
    const myChat = await api.getMyChatList();
    loadChats(myChat);
    setLoading(false);
  }, [accessToken]);

  useEffect(() => {
    loadAllMyChats();
  }, []);

  return { loading, chats };
};
