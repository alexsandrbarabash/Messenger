import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  APP_NAME: Joi.string().default('nest-api'),
  DATABASE_URL: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.number().default(3600).required(),
});
