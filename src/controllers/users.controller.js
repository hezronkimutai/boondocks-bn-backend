import Responses from '../utils/response';
import hash from '../utils/hash';
import JWTHelper from '../utils/jwt';
import db from '../models';
import UserServices from '../services/User.service';
import Mailer from '../services/Mailer.services';

/**
 * Class for users related operations
 */
class UserController {
  /**
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {object} responses
   */
  async createUser(req, res) {
    const passwordHash = hash.generateSync(req.body.password);
    const host = `${req.protocol}://${req.get('host')}`;
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
    const mail = new Mailer({
      name: userData.firstName,
      to: userData.email,
      host,
      token
    });
    await mail.sendVerificationEmail();
    return Responses.handleSuccess(201, 'created', res, data);
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
  async findUser(req, res) {
    const user = await UserServices.findUserByEmail(req.body.email);
    if (!user) {
      return Responses.handleError(404, 'invalid credentials', res);
    }
    if (!hash.compareSync(req.body.password, user.password)) {
      return Responses.handleError(400, 'invalid credentials', res);
    }

    const token = await JWTHelper.signToken(user);
    const data = {
      firstName: user.firstName,
      lastName: user.lastName,
      token
    };
    return Responses.handleSuccess(200, 'success', res, data);
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {object} responses
   */
  async verifyAccount(req, res) {
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
  }

  /**
   *function resend email
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {object} responses
   */
  async resendEmail(req, res) {
    const { email } = req.query;
    const host = `${req.protocol}://${req.get('host')}`;
    const user = await db.user.findOne({
      where: { email }
    });
    if (user) {
      const token = await JWTHelper.signToken(user);
      const mail = new Mailer({
        name: user.firstName,
        to: user.email,
        token,
        host
      });
      await mail.sendVerificationEmail();
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
  }

  /**
   * forgot password controller
   * @param {*} req
   * @param {*} res
   * @returns {*} responses
   */
  async forgotPassword(req, res) {
    const host = `${req.protocol}://${req.get('host')}`;
    const user = await UserServices.findUserByEmail(req.body.email);
    if (!user) {
      return Responses.handleError(404, 'User with such email does not exist', res);
    }
    const token = await JWTHelper.signToken(user);
    const resetPasswordMail = new Mailer({
      name: user.firstName,
      to: user.email,
      host,
      token
    });
    await resetPasswordMail.sendResetPassword();
    return Responses.handleSuccess(200, 'Successful reset password please check your email', res);
  }

  /**
   * reset password controller
   * @param {*} req
   * @param {*} res
   * @returns {*} responses
   */
  async resetPassword(req, res) {
    const { user } = res.locals;
    const host = `${req.protocol}://${req.get('host')}`;
    if (!user) {
      return Responses.handleError(404, 'User does not exist, Please register', res);
    }
    const password = hash.generateSync(req.body.password);
    await db.user.update(
      {
        password
      },
      { where: { email: user.email } }
    );
    const resetPasswordMail = new Mailer({
      name: user.firstName,
      to: user.email,
      host
    });
    await resetPasswordMail.sendResetSuccess();
    return Responses.handleSuccess(
      200,
      'Updated your password successful',
      res
    );
  }

  /**
   *function resend email
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {object} responses
   */
  async fetchAllUsers(req, res) {
    const allUsers = await db.user.findAll({
      attributes: { exclude: ['password'] }
    });
    return Responses.handleSuccess(200, 'successfully retrieved all users', res, allUsers);
  }
}

export default new UserController();
