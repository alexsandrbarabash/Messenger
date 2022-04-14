import { createEvent, createStore } from 'effector';

import { IAlertStore } from '../types';

export const showAlert = createEvent<string>();
export const unShowAlert = createEvent();

export const alertStore = createStore<IAlertStore>({
  message: '',
  show: false
})
  .on(unShowAlert, (state: IAlertStore) => ({
    ...state,
    message: '',
    show: false
  }))
  .on(showAlert, (state, message: string) => ({
    ...state,
    message,
    show: true
  }));
