import db from '../models';
import ErrorHandler from '../utils/error';

/**
 * Class User services creates a middleware
 */
class UserServices {
  /**
   * findUserByEmail - used to get user from database by email
   * @param {string} email - email of the user
   * @returns {object} user data from database
   */
  async findUserByEmail(email) {
    const user = await db.user.findOne({
      where: { email }
    });
    if (!user) return null;
    return user;
  }

  /**
   * setUserRole - used to update a user's role by the email provided
   * @param {object} body - request object posted to route
   * @returns {object} updated user object
   */
  async setUserRole(body) {
    try {
      const updateUser = await db.user.update(
        {
          role: body.role
        },
        {
          returning: true,
          where: { email: body.email }
        }
      );
        // eslint-disable-next-line no-unused-vars
      const [rowsUpdate, [updatedUser]] = updateUser;
      return updatedUser;
    } catch (error) {
      throw new ErrorHandler(500, error.message);
    }
  }
}
export default new UserServices();
