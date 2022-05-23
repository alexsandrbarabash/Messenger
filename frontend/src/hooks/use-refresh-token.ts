import { useEffect, useState } from 'react';
import { useStore } from 'effector-react';

import { login, userStore, refresh } from '../stores';
import { LocalStorageEnum } from '../enums';
import { AuthApiHandler, UserApiHandler } from '../api';

export const useRefreshToken = () => {
  const { isAuth } = useStore(userStore);
  const [loading, setLoading] = useState(true);

  const updateRefreshToken = async () => {
    const refreshToken = localStorage.getItem(LocalStorageEnum.REFRESH_TOKEN);
    if (!refreshToken) {
      setLoading(false);
      return;
    }
    const authApi = new AuthApiHandler();
    const data = await authApi.refresh(refreshToken);
    localStorage.setItem(LocalStorageEnum.REFRESH_TOKEN, data.refreshToken);

    if (!isAuth) {
      const userApi = new UserApiHandler(data.accessToken);
      const user = await userApi.getMe();
      login({ ...user, ...data });
      setLoading(false);
    } else {
      refresh(data);
    }
  };

  useEffect(() => {
    updateRefreshToken();
  }, []);

  useEffect(() => {
    const expiresIn = +process.env.REACT_APP_TOKEN_LIVE_TIME!; // minutes
    if (!expiresIn) {
      throw new Error('Check env');
    }
    let interval: any;
    if (isAuth) {
      interval = setInterval(() => {
        updateRefreshToken();
      }, expiresIn);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isAuth]);

  return { loading };
};
