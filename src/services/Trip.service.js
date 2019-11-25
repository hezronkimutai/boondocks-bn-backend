import db from '../models';

/**
 * Class trip service, creates trips
 */
class Trip {
  /**
   * creates a single trip
   * @param {object} data
   * @returns {object} returns nothing
   */
  async create(data) {
    const {
      userId,
      hotelId,
      type,
      leavingFrom,
      goingTo,
      travelDate,
      returnDate,
      reason,
      rooms,
      requestId
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
