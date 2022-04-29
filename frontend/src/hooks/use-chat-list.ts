import { useState, useEffect } from 'react';
import { useStore } from 'effector-react';

import { userStore } from '../stores';
import { IChatCard } from '../types';
import { ChatsApiHandler } from '../api';

export const useChatList = () => {
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState<IChatCard[]>([]);

  const { accessToken } = useStore(userStore);

  const loadAllMyChats = async () => {
    setLoading(true);
    const api = new ChatsApiHandler(accessToken);
    const myChat = await api.getMyChatList();
    setChats(myChat);
    setLoading(false);
  };

  useEffect(() => {
    loadAllMyChats();
  }, []);

  return { loading, chats };
};
