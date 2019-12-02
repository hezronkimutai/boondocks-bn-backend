import db from '../models';
import AppError from '../utils/error';

/**
 * Class Comment services creates a middleware
 */
class CommentService {
  /**
   * findUserByEmail - used to get user from database by email
   * @param {string} userId - email of the user
   * @param {string} requestId - email of the user
   * @param {string} comment - email of the user
   * @returns {object} user data from database
   */
  async postRequestComment(userId, requestId, comment) {
    const requestData = await db.request.findOne({ where: { id: requestId } });


    if (!requestData) {
      throw new AppError('request resource not found', 404);
    }

    const request = requestData.dataValues;

    const userLineManagerData = await db.user.findOne({
      where: { id: request.userId },
      attributes: ['lineManagerId']
    });

    const lineManagerId = userLineManagerData && userLineManagerData.dataValues.lineManagerId;

    if (userId !== lineManagerId && userId !== request.userId) {
      throw new AppError('Unauthorised: you are not authorised to perform this operation', 403);
    }

    // eslint-disable-next-line no-return-await
    return await db.comment.create({
      userId,
      comment,
      requestId
    });
  }
}

export default new CommentService();
