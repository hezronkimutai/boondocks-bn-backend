import express from 'express';
import catchErrors from '../../utils/helper';
import CommentController from '../../controllers/comments.controller';
import { verifyUser } from '../../middlewares/checkToken';
import { validation } from '../../validation/validation';

const router = express.Router();

/**
 * @swagger
 *
 * /api/v1/requests/:requestId/comment:
 *   post:
 *     tags:
 *       - Comment
 *     summary: Make a Comment
 *     description: Allows a user to make a comment on trip request
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: params
 *         name: requestId
 *       - in: body
 *         name: comment
 *         schema:
 *           type: object
 *           properties:
 *             comment:
 *               type: string
 *               example: I need this trip because...
 *     responses:
 *       '201':
 *         description: Comment posted successfully
 *       '403':
 *         description: User not allowed to comment on this request
 */
router.post('/requests/:requestId/comment', verifyUser, validation, catchErrors(CommentController.postComment));

export default router;
