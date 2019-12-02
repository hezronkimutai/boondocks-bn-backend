import Responses from '../utils/response';
import { createRequest, getRequestById } from '../services/request.service';
import tripService from '../services/Trip.service';

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
  async createTrip(req, res) {
    const currentUser = res.locals.user;
    const {
      hotelId,
      leavingFrom,
      goingTo,
      type,
      travelDate,
      returnDate,
      reason,
      rooms
    } = req.body;

    const requestId = await createRequest(currentUser.userId, 'single');


    tripService.create({
      hotelId,
      type,
      leavingFrom,
      goingTo,
      travelDate,
      returnDate,
      reason,
      rooms,
      requestId,
      userId: currentUser.userId
    });

    const request = await getRequestById(requestId);

    return Responses.handleSuccess(201, 'created', res, request);
  }

  /**
   * Create a multi cities trip request
   * @param {*} req
   * @param {*} res
   * @returns {Object} response
   */
  async createMultiCitiesTrip(req, res) {
    const trips = req.body;
    const currentUser = res.locals.user;

    const requestId = await createRequest(currentUser.userId, 'multi');

    trips.forEach(async (travel) => {
      const {
        hotelId,
        type,
        leavingFrom,
        goingTo,
        travelDate,
        reason,
        rooms
      } = travel;

      tripService.create({
        hotelId,
        type,
        leavingFrom,
        goingTo,
        travelDate,
        reason,
        rooms,
        requestId,
        userId: currentUser.userId
      });
    });

    const request = await getRequestById(requestId);

    return Responses.handleSuccess(201, 'created', res, request);
  }
}

export default new Trips();
