import express from 'express';
import trips from '../../controllers/trips.controller';
import { verifyUser } from '../../middlewares/checkToken';
import checkForRooms from '../../middlewares/roomsAvailability';
import validation from '../../validation/validation';

const router = express.Router();

/**
 * @swagger
 *
 * /trips/return:
 *   post:
 *     summary: Make a return trip
 *     description: This creates a return trip and book required accomodation
 *     tags:
 *       - Trips
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hotelId:
 *                 type: integer
 *               type:
 *                 type: string
 *               leavingFrom:
 *                 type: string
 *               goingTo:
 *                 type: string
 *               travelDate:
 *                 type: string
 *               returnDate:
 *                 type: string
 *               reason:
 *                 type: string
 *               rooms:
 *                 type: array
 *                 items:
 *                   type: integer
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
 *                   leavingFrom:
 *                     type: string
 *                   goingTo:
 *                     type: string
 *                   travelDate:
 *                     type: string
 *                   returnDate:
 *                     type: string
 *                   reason:
 *                     type: string
 *                   hotelId:
 *                     type: integer
 *                   userId:
 *                     type: integer
 *                   status:
 *                     type: string
 *                   updatedAt:
 *                     type: string
 *                   createAt:
 *                     type: string
 *     responses:
 *       200:
 *         description: success
 *       409:
 *         description: Room not available
 *       401:
 *         description: unauthorized
 */
router.post('/trips/return', verifyUser, validation, checkForRooms, trips.createReturnTrip);

export default router;
