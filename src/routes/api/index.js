import express from 'express';
import users from './users';

const router = express.Router();

/**
 * @swagger
 *
 * /user:
 *   get:
 *     summary: Current logged in user
 *     description: retrieves logged in user
 *     tags:
 *       - Users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: success
 */
router.get('/user', users.getUser);

/**
 * @swagger
 *
 * /signup:
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
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: success
 */
router.post('/users', users.createUser);

export default router;
