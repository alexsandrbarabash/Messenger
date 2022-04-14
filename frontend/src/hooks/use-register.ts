import { useState } from 'react';
import joi, { ValidationResult } from 'joi';
import { useNavigate } from 'react-router-dom';

import { ApiHandler } from '../api';
import { showAlert } from '../stores';
import { PagesEnum } from '../enums';

const validationSchema = joi.object({
  password: joi.string().required(),
  username: joi.string().required(),
  firstName: joi.string().optional(),
  lastName: joi.string().optional()
});

export const useRegister = () => {
  const [isLoad, setIsLoad] = useState(false);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate();

  const registerHandler = async () => {
    try {
      const validationResult: ValidationResult = validationSchema.validate({
        username,
        password,
        firstName,
        lastName
      });
      if (validationResult.error) {
        return showAlert(validationResult.error.message);
      }

      const api = new ApiHandler();
      setIsLoad(true);
      await api.register({
        username,
        password,
        firstName,
        lastName
      });
      navigate(PagesEnum.AUTH);
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
    firstName,
    setFirstName,
    lastName,
    setLastName,
    registerHandler
  };
};
