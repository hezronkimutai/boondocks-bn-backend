import Responses from '../utils/response';
import TripService from '../services/Trip.service';

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
    const trip = await TripService.createSingleTrip({
      userId: currentUser.userId,
      hotelId,
      leavingFrom,
      goingTo,
      travelDate,
      returnDate,
      reason,
      rooms
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
      leavingFrom,
      goingTo,
      travelDate,
      reason,
      rooms
    } = req.body;

    const trip = await TripService.createSingleTrip({
      userId: currentUser.userId,
      hotelId,
      leavingFrom,
      goingTo,
      travelDate,
      reason,
      rooms
    });

    return Responses.handleSuccess(201, 'created', res, trip);
  }
}

export default new Trips();
