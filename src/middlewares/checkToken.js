import JWThelper from '../utils/jwt';
import db from '../models';
import Responses from '../utils/response';

/**
 * function - decodes the token from the email verification
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {undefined}
 */
const decodeQueryToken = async (req, res, next) => {
  const { token } = req.query;
  const decoded = await JWThelper.decodeToken(token);
  if (Object.keys(decoded)[0] === 'error') {
    return Responses.handleError(401, 'invalid token, Please try to regenerate another email', res);
  }
  const user = await db.user.findOne({
    where: { email: decoded.email }
  });
  res.locals.user = user;
  next();
};

export default decodeQueryToken;
