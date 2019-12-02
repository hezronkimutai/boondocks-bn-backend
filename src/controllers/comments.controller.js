import Responses from '../utils/response';
import CommentService from '../services/Comment.service';

/**
 * Comments controller Class
 */
class CommentsController {
  /**
   * @name postComment
   * @description Allows a user post a comment
   * @param {object} req The request object
   * @param {object} res The response object
   * @returns {object} response
   */
  async postComment(req, res) {
    const { userId } = res.locals.user;
    const { comment } = req.body;
    const { requestId } = req.params;

    const commentData = await CommentService.postRequestComment(userId, requestId, comment);

    Responses.handleSuccess(201, 'Comment posted successfully', res, commentData.dataValues);
  }
}

export default new CommentsController();
