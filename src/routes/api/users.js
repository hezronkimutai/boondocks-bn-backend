import express from 'express';
import users from '../../controllers/users';
import validation from '../../middlewares/validation';
import checkForEmail from '../../middlewares/user.validation';
import userEmailToken from '../../middlewares/userEmailVerification';

const router = express.Router();

/**
 * @swagger
 *
 * /auth/signup:
 *   post:
 *     summary: User Signup
 *     description: Creates a new user account
 *     tags:
 *       - Users
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     produces:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *               message:
 *                 type: string
 *               data:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   token:
 *                     type: string
 *     responses:
 *       201:
 *         description: created
 */
router.post('/auth/signup', validation, checkForEmail, users.createUser);

/**
 * @swagger
 *
 *auth/verification:
 *  get:
 *    tags:
 *      - users
 *    summary: User email verification
 *    description: verifies users acount using an email
 *    produces:
 *      application/json:
 *        schema:
 *          type: object
 *          properties:
 *            status:
 *              type: string
 *            message:
 *              type: string
 *    parameters:
 *      - in: query
 *        name: token
 *        description: user's token for verification
 *        type: string
 *    responses:
 *      '500':
 *        description: Error at verification
 *      '401':
 *        description: invalid token
 *      '409':
 *        description: trying to verify again
 *      '200':
 *        description: succesfull verified
 */
router.get('/auth/verification', userEmailToken, users.verifyAccount);

/**
 * @swagger
 *
 * /auth/signin:
 *   post:
 *     summary: User SignIn
 *     description: Logs in an existing User
 *     tags:
 *       - Users
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     produces:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *               message:
 *                 type: string
 *               data:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   token:
 *                     type: string
 *     responses:
 *       200:
 *         description: success
 */
router.post('/auth/signin', validation, users.findUser);

/**
 * @swagger
 *
 *auth/verification:
 *  get:
 *    tags:
 *      - users
 *    summary: User email verification
 *    description: verifies users acount using an email
 *    produces:
 *      application/json:
 *        schema:
 *          type: object
 *          properties:
 *            status:
 *              type: string
 *            message:
 *              type: string
 *    parameters:
 *      - in: query
 *        name: email
 *        description: user's email
 *        type: string
 *    responses:
 *      '500':
 *        description: Error at verification
 *      '404':
 *        description: email not found
 *      '200':
 *        description: succesfull verified
 */
router.get('/auth/reverifyUser', users.resendEmail);

export default router;
