import Joi from '@hapi/joi';
import Schemas from '../utils/schemas';
import Responses from '../utils/response';
/**
 * Validates the signup or signin routes using the defined schemas
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {void}
 */
const validation = (req, res, next) => {
  const methodsSupported = ['post', 'put', 'patch'];
  const { path } = req.route;
  const method = req.method.toLowerCase();

  if (methodsSupported.includes(method) && Schemas[path] !== undefined) {
    const schema = Schemas[path];

    return Joi.validate(req.body, schema, (error, data) => {
      if (error) {
        return Responses.handleError(400, error.details[0].message, res);
      }

      req.body = data;
      next();
    });
  }
  return Responses.handleError(405, 'Undefined method', res);
};

export default validation;
