import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import '@csstools/normalize.css';

import { GlobalStyle } from 'common/styles';
import { AppRouter, ErrorBoundary } from 'containers';

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <ErrorBoundary>
        <AppRouter />
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export { App };
