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
const userEmailVerification = async (req, res, next) => {
  const { token } = req.query;
  const decoded = await JWThelper.decodeToken(token);
  if (Object.keys(decoded)[0] === 'error') {
    return Responses.handleError(401, 'invalid token, regenerate another token using the link in your verification email', res);
  }
  const user = await db.user.findOne({
    where: { email: decoded.email }
  });
  res.locals.user = user;
  next();
};

export default userEmailVerification;
