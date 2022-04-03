import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { PagesEnum } from 'enum';
import { HomePage, NotFoundPage } from 'pages';

const AppRouter = () => {
  return (
    <Routes>
      <Route path={PagesEnum.HOME} element={<HomePage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};

export { AppRouter };
