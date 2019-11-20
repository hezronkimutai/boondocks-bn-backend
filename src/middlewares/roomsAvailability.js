import db from '../models';
import Responses from '../utils/response';
/**
 * Checks if the room is reserved or booked
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {object} res
 */
const checkForRooms = async (req, res, next) => {
  const { Op } = db.Sequelize;

  const unavailableRooms = await db.room.findAndCountAll({
    where: {
      id: {
        [Op.or]: req.body.rooms
      },
      status: {
        [Op.or]: ['reserved', 'booked']
      }
    },
    attributes: ['id']
  });

  if (unavailableRooms.count > 0) {
    const bookedRooms = unavailableRooms.rows.map(room => room.id);
    return Responses.handleSuccess('409', 'rooms already booked', res, { unAvailableRooms: bookedRooms });
  }
  next();
};


export default checkForRooms;
