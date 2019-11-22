import Responses from '../utils/response';
import db from '../models';
/**
 * Class for Trips
 */
class Trips {
  /**
   * Creates a return trip
   * @param {*} req
   * @param {*} res
   * @returns {Object} response
   */
  async createReturnTrip(req, res) {
    const currentUser = res.locals.user;
    const {
      hotelId,
      leavingFrom,
      goingTo,
      travelDate,
      returnDate,
      reason,
      rooms
    } = req.body;
    rooms.forEach(async (room) => {
      await db.booking.create({
        hotelId,
        userId: currentUser.userId,
        roomId: room
      });

      await db.room.update({ status: 'reserved' }, {
        where: {
          id: room
        }
      });
    });

    const trip = await db.trip.create({
      leavingFrom,
      goingTo,
      travelDate,
      returnDate,
      reason,
      hotelId,
      userId: currentUser.userId,
      status: 'pending',
      type: 'return'
    });

    return Responses.handleSuccess(201, 'created', res, trip);
  }

  /**
   * Creates a one way trip request
   * @param {*} req
   * @param {*} res
   * @returns {Object} response
   */
  async createOneWayTrip(req, res) {
    const currentUser = res.locals.user;
    const {
      hotelId,
      type,
      leavingFrom,
      goingTo,
      travelDate,
      reason,
      rooms
    } = req.body;

    const trip = await db.trip.create({
      userId: currentUser.userId,
      hotelId,
      type,
      leavingFrom,
      goingTo,
      travelDate,
      reason,
    });
    rooms.forEach(async (room) => {
      await db.booking.create({
        hotelId,
        userId: currentUser.userId,
        roomId: room
      });
      await db.room.update({ status: 'reserved' }, {
        where: {
          id: room
        }
      });
    });

    return Responses.handleSuccess(201, 'created', res, trip);
  }
}

export default new Trips();
