import Joi from '@hapi/joi';

const signupSchema = {
  firstName: Joi.string().strict().trim().required(),
  lastName: Joi.string().strict().trim().required(),
  email: Joi.strict().trim().email().required(),
  password: Joi.string().alphanum().min(8).required()
    .strict(),
};

const signinSchema = {
  email: Joi.strict().trim().email().required(),
  password: Joi.string().alphanum().min(8).required(),
};

export default {
  '/auth/signup': signupSchema,
  '/auth/signin': signinSchema
};
