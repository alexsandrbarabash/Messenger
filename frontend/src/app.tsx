import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import '@csstools/normalize.css';

import { GlobalStyle } from './common/styles';
import { AppRouter, ErrorBoundary } from './containers';
import { AlertComponent } from './components';

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <ErrorBoundary>
        <AlertComponent />
        <AppRouter />
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export { App };
