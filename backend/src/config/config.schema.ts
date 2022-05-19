import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  APP_NAME: Joi.string().default('nest-api'),
  PORT: Joi.number().required(),
  DATABASE_URL: Joi.string().required(),
  JWT_EXPIRES_IN_ACCESS: Joi.number().required(),
  JWT_EXPIRES_IN_REFRESH: Joi.number().required(),
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().required(),
});
