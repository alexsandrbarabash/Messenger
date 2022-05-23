import { useContext, useState } from 'react';

import { IChip, IWebsocketContext } from '../types';
import { useStore } from 'effector-react';
import { userStore } from '../stores';
import { UserApiHandler } from '../api';
import { WebsocketContext } from '../context';

export const useCreateChat = () => {
  const [open, setOpen] = useState(false);
  const [usernames, setUsernames] = useState<IChip[]>([]);
  const [username, setUsername] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { accessToken } = useStore(userStore);
  const { createChat } = useContext<IWebsocketContext>(WebsocketContext);

  const submit = async () => {
    setLoading(false);
    const userApi = new UserApiHandler(accessToken);
    const users: { userId: string }[] = [];

    for await (const name of usernames) {
      const user = await userApi.getUserByUsername(name.text);

      users.push({ userId: user.id });
    }

    createChat({ title, users });
    setLoading(true);
    handleClose();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setUsernames([]);
    setUsername('');
    setOpen(false);
  };

  return {
    open,
    handleOpen,
    handleClose,
    usernames,
    setUsernames,
    username,
    setUsername,
    title,
    setTitle,
    submit,
    loading
  };
};
