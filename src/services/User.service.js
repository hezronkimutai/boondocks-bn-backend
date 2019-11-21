import db from '../models';

/**
 * Class User services creates a middleware
 */
class UserServices {
  /**
   * findUserByEmail - used to get user from database by email
   * @param {string} email - email of the user
   * @returns {object} user data from database
   */
  static async findUserByEmail(email) {
    const user = await db.user.findOne({
      where: { email }
    });
    if (!user) return null;
    return user;
  }
}

export default UserServices;
