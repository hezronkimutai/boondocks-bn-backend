import db from '../models';
import { createRequest } from './request.service';

/**
 * Class trip service, creates trips
 */
class Trip {
  /**
   * creates a single trip
   * @param {object} data
   * @returns {object} returns nothing
   */
  async createSingleTrip(data) {
    const {
      userId,
      hotelId,
      type,
      leavingFrom,
      goingTo,
      travelDate,
      returnDate,
      reason,
      rooms
    } = data;

    rooms.forEach(async (room) => {
      await db.booking.create({
        hotelId,
        userId,
        roomId: room
      });
      await db.room.update({ status: 'reserved' }, {
        where: {
          id: room
        }
      });
    });
    const requestId = await createRequest(userId, 'single');
    const trip = await db.trip.create({
      userId,
      hotelId,
      type,
      leavingFrom,
      goingTo,
      requestId,
      travelDate,
      returnDate,
      reason,
    });
    return trip;
  }
}

export default new Trip();
