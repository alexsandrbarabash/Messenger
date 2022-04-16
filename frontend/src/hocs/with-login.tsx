import React, { useEffect } from 'react';
import { useStore } from 'effector-react';
import { useNavigate } from 'react-router-dom';

import { userStore } from '../stores';
import { PagesEnum } from '../enums';

export const withLogin = (Component: React.FC<any>) => (props: any) => {
  const navigate = useNavigate();
  const { isAuth } = useStore(userStore);
  useEffect(() => {
    if (!isAuth) {
      navigate(PagesEnum.AUTH);
    }
  }, [isAuth]);

  return <Component {...props} />;
};
