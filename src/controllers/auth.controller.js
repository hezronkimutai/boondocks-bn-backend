/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import db from '../models';
import JWTToken from '../utils/jwt';
import { randomPw } from '../utils/helpers';
import hash from '../utils/hash';
import Responses from '../utils/response';

export const getTokenAfterSignIn = async (res, user) => {
  try {
    const userDetails = user.dataValues;
    const token = await JWTToken.signToken(userDetails);
    return Responses.handleSuccess(201, 'User logged in successfully', res, { token });
  } catch (e) {
    return Responses.handleError(500, e.message, res);
  }
};

/** Auth Class */
class AuthController {
  /**
   * facebookSignin
   *
   * @param {object} req - request object
   * @param {object} res - response object
   *
   * @returns {object} - object containing a user object and token
   * @memberof AuthController
   *
   */
  async facebookSignin(req, res) {
    const { first_name, last_name, email } = req.user._json;
    await db.user.findOrCreate({
      where: { email },
      defaults: {
        firstName: first_name,
        lastName: last_name,
        email,
        isVerified: true,
        password: hash.generateSync(randomPw(8)),
      }
    })
    // eslint-disable-next-line no-unused-vars
      .spread((user$, isCreated) => getTokenAfterSignIn(res, user$));
  }

  /**
   * googleSignIn
   *
   * @param {object} req - request object
   * @param {object} res - response object
   *
   * @returns {object} - object containing a user object and token
   * @memberof AuthController
   */
  async googleSignIn(req, res) {
    const { displayName, emails } = req.user;
    await db.user.findOrCreate({
      where: { email: emails[0].value },
      defaults: {
        firstName: displayName.split(' ')[0],
        lastName: displayName.split(' ')[1],
        email: emails[0].value,
        isVerified: true
      }
    })
    // eslint-disable-next-line no-unused-vars
      .spread((user, isCreated) => getTokenAfterSignIn(res, user));
  }
}

export default new AuthController();
