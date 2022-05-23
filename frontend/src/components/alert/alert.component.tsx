import React from 'react';
import { useStore } from 'effector-react';
import { Alert } from '@mui/material';

import { AlertWrapper } from './alert.styles';
import { alertStore, unShowAlert } from '../../stores';

export const AlertComponent = () => {
  const { show, message } = useStore(alertStore);

  return (
    <AlertWrapper>
      {show ? (
        <Alert severity='error' onClose={() => unShowAlert()}>
          {message}
        </Alert>
      ) : null}
    </AlertWrapper>
  );
};
