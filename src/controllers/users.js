import hash from '../utils/hash';
import Responses from '../utils/response';
import JWTHelper from '../utils/jwt';
import db from '../models';
import Mailer from '../services/mailer.service';
import ErrorHandler from '../utils/error';

/**
 * Class for users related operations
 */
export default class {
  /**
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {object} responses
   */
  static async createUser(req, res, next) {
    try {
      const passwordHash = hash.generateSync(req.body.password);
      const hostUrl = `${req.protocol}://${req.get('host')}`;
      const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: passwordHash
      };
      const user = await db.user.create(userData);
      const token = await JWTHelper.signToken(user);
      const data = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        token
      };
      Mailer.sendVerificationEmail(userData.firstName, hostUrl, userData.email, token);
      return Responses.handleSuccess(201, 'created', res, data);
    } catch (err) {
      next(new ErrorHandler('Error at register'));
    }
  }

  /**
   * Logs in a user by checking if they exist in the database
   * and if the supplied password matches the stored password
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @param {function} next Allow the next function to continue
   * @returns {Object} A user object with selected fields
   * excluing the password
   */
  static async findUser(req, res) {
    try {
      const user = await db.user.findOne({
        where: { email: req.body.email }
      });
      if (!user) {
        return Responses.handleError(404, 'invalid credentials', res);
      }
      if (!hash.compareSync(req.body.password, user.password)) {
        return Responses.handleError(400, 'invalid credentials', res);
      }
      try {
        const token = await JWTHelper.signToken(user);
        const data = {
          firstName: user.firstName,
          lastName: user.lastName,
          token
        };
        return Responses.handleSuccess(200, 'success', res, data);
      } catch (error) {
        return Responses.handleSuccess(500, 'server error', res);
      }
    } catch (error) {
      return Responses.handleSuccess(500, 'server error', res);
    }
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {object} responses
   */
  static async verifyAccount(req, res, next) {
    try {
      const { user } = res.locals;
      if (!user.isVerified) {
        await db.user.update(
          {
            isVerified: true
          },
          { where: { email: user.email } }
        );
        return Responses.handleSuccess(
          200,
          'Email has been verified successfully, please proceed to log in',
          res
        );
      }

      return Responses.handleError(
        409,
        'you are already verified, please login to proceed',
        res
      );
    } catch (err) {
      next(new ErrorHandler('Error at verification'));
    }
  }

  /**
   *function resend email
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {object} responses
   */
  static async resendEmail(req, res, next) {
    try {
      const { email } = req.query;
      const hostUrl = `${req.protocol}://${req.get('host')}`;
      const user = await db.user.findOne({
        where: { email }
      });
      if (user) {
        const token = await JWTHelper.signToken(user);
        await Mailer.sendVerificationEmail(user.firstName, hostUrl, user.email, token);
        return Responses.handleSuccess(
          200,
          'Email has been resent successfully, please check your mail',
          res
        );
      }
      return Responses.handleError(
        404,
        'No account with such email exists, please sign up',
        res
      );
    } catch (err) {
      next(new ErrorHandler('Error at verification'));
    }
  }
}
