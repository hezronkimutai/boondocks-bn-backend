import Responses from '../utils/response';
import hash from '../utils/hash';
import JWTHelper from '../utils/jwt';
import db from '../models';

/**
 * Class for users related operations
 */
export default class {
  /**
   * Creates a new user and generate a token
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Object} response
   */
  static async createUser(req, res) {
    const passwordHash = hash.generateSync(req.body.password);

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
    Responses.handleSuccess(201, 'created', res, data);
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
}
