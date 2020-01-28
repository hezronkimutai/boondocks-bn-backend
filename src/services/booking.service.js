import db from '../models';

/**
 * Accomodation booking service
 */
class BookingService {
  /**
     * Create a new booking
     *
     * @param {Object} params booking information
     * @param {Number} params.hotelId hotel ID
     * @param {Number} params.userId user ID
     * @param {Number} params.roomId booked room
     * @param {String} params.leavingDate leaving date
     * @param {String} params.returnDate leaving date
     * @param {Number} params.tripId trip
     * @returns {Object} booking
     */
  async create(params) {
    const {
      hotelId,
      userId,
      arrivalDate,
      leavingDate,
      roomId,
      tripId,
    } = params;

    const booking = await db.booking.create({
      hotelId,
      userId,
      arrivalDate,
      leavingDate,
      roomId,
      tripId
    });

    return booking;
  }

  // eslint-disable-next-line require-jsdoc
  async getAllBookings({ userId, travelAdminId }) {
    const whereOptions = userId ? 'WHERE b."userId"=:id' : 'WHERE h."userId"=:id';

    const query = `SELECT b.id, r.id as "roomId", 
    r.status as "roomStatus", u."firstName", u."lastName", 
    b."arrivalDate", b."leavingDate", b."createdAt", 
    h.name as hotel, r.name as room, h.id as "hotelId"
    FROM bookings AS b
    JOIN  users AS u
    ON u."id" = b."userId"
    JOIN rooms AS r
    ON r."id"=b."roomId"
    JOIN hotels AS h
    ON h."id" = r."hotelId" 
    ${whereOptions}
    ORDER BY b."createdAt" DESC
    `;

    return db.sequelize.query(
      query, {
        replacements: {
          id: userId || travelAdminId
        },
        type: db.sequelize.QueryTypes.SELECT
      }
    );
  }
}

export default new BookingService();
