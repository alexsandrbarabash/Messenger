import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import '@csstools/normalize.css';

import { GlobalStyle } from './common/styles';
import { AppRouter, ErrorBoundary } from './containers';
import { AlertComponent, Loader } from './components';
import { useRefreshToken } from './hooks';

const App = () => {
  const { loading } = useRefreshToken();

  if (loading) {
    return <Loader />;
  }

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
