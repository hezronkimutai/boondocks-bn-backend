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

    rooms.forEach(async (room) => {
      await db.booking.create({
        hotelId,
        userId,
        roomId: room,
        tripId: trip.id
      });
      await db.room.update({ status: 'reserved' }, {
        where: {
          id: room
        }
      });
    });
    return trip;
  }

  /**
   * fetches a single trip
   * @param {number} tripId
   * @returns {object} returns trip object or null
   */
  async findTripById(tripId) {
    const trip = await db.trip.findByPk(tripId);
    if (!trip) return null;
    return trip;
  }

  /**
 * Checks if the room is reserved or booked
 * @param {object} rooms
 * @param {object} res
 * @returns {object} res
 */
  async checkForRoomsOnUpdate(rooms, res) {
    const { Op } = db.Sequelize;

    const unavailableRooms = await db.room.findAndCountAll({
      where: {
        id: {
          [Op.or]: rooms
        },
        status: {
          [Op.or]: ['reserved', 'booked']
        },
      },
      include: [{
        model: db.booking,
        where: {
          userId: {
            [Op.ne]: res.locals.user.userId
          }
        }
      }],
      attributes: ['id']
    });
    return unavailableRooms;
  }
}

export default new Trip();
