import Joi from '@hapi/joi';

const signupSchema = Joi.object().keys({
  firstName: Joi.string().strict().trim().required(),
  lastName: Joi.string().strict().trim().required(),
  email: Joi.string().strict().trim().email()
    .required(),
  password: Joi.string().alphanum().min(8).required()
}).options({
  abortEarly: false,
  language: {
    key: '{{key}} '
  }
});

const signinSchema = Joi.object().keys({
  email: Joi.string().strict().trim().email()
    .required(),
  password: Joi.required()
}).options({
  abortEarly: false,
  language: {
    key: '{{key}} '
  }
});

export default {
  '/auth/signup': signupSchema,
  '/auth/signin': signinSchema
};
