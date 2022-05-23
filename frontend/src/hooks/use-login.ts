import { useState } from 'react';
import joi, { ValidationResult } from 'joi';
import { useNavigate } from 'react-router-dom';

import { AuthApiHandler } from '../api';
import { showAlert, login } from '../stores';
import { PagesEnum, LocalStorageEnum } from '../enums';

const validationSchema = joi.object({
  password: joi.string().required(),
  username: joi.string().required()
});

export const useLogin = () => {
  const [isLoad, setIsLoad] = useState(false);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const logInHandler = async () => {
    try {
      const validationResult: ValidationResult = validationSchema.validate({
        username,
        password
      });
      if (validationResult.error) {
        return showAlert(validationResult.error.message);
      }

      const api = new AuthApiHandler();
      setIsLoad(true);
      const tokens = await api.logIn({
        username,
        password
      });
      login(tokens);
      localStorage.setItem(LocalStorageEnum.REFRESH_TOKEN, tokens.refreshToken);
      navigate(PagesEnum.HOME);
    } catch (error) {
      setIsLoad(false);
      const status = error?.status || error?.response?.status || 500;
      showAlert(`Server error status: ${status}`);
    }
  };

  return {
    password,
    setPassword,
    username,
    setUsername,
    isLoad,
    logInHandler
  };
};
