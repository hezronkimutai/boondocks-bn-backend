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

const resetPassword = Joi.object().keys({
  password: Joi.string().alphanum().min(8).required()
    .strict()
});

const oneWaySchema = Joi.object().keys({
  hotelId: Joi.required(),
  type: Joi.string().strict().trim().required(),
  leavingFrom: Joi.string().strict().trim().required(),
  goingTo: Joi.string().strict().required(),
  travelDate: Joi.date().required(),
  reason: Joi.string().strict().required(),
  rooms: Joi.required()
}).options({
  abortEarly: false,
  language: {
    key: '{{key}} '
  }
});

const twoWaySchema = Joi.object().keys({
  hotelId: Joi.required(),
  type: Joi.string().strict().trim().required(),
  leavingFrom: Joi.string().strict().trim().required(),
  goingTo: Joi.string().strict().required(),
  travelDate: Joi.date().required(),
  returnDate: Joi.date().required(),
  reason: Joi.string().strict().required(),
  rooms: Joi.required()
}).options({
  abortEarly: false,
  language: {
    key: '{{key}} '
  }
});

export default {
  '/auth/resetPassword': resetPassword,
  '/auth/signup': signupSchema,
  '/auth/signin': signinSchema,
  '/trips/oneway': oneWaySchema,
  '/trips/return': twoWaySchema
};
