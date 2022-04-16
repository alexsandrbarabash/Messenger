import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { PagesEnum } from '../../enums';
import { HomePage, NotFoundPage, AuthPage, RegisterPage } from 'pages';

const AppRouter = () => {
  return (
    <Routes>
      <Route path={PagesEnum.HOME} element={<HomePage />} />
      <Route path={PagesEnum.HOME_WITH_PARAMS} element={<HomePage />} />
      <Route path={PagesEnum.AUTH} element={<AuthPage />} />
      <Route path={PagesEnum.REGISTER} element={<RegisterPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};

export { AppRouter };
