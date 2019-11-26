import db from '../models';
import ErrorHandler from '../utils/error';

const createRequest = async (userId, type) => {
  const request = await db.request.create(
    {
      userId, type
    },
    {
      returning: true,
    }
  );
  return request.id;
};

const getRequestbyStatus = async (status, userId) => {
  const requests = await db.request.findAll({
    where: {
      userId,
      status
    },
    include: [{
      model: db.trip
    }, {
      model: db.comment
    }]
  });
  return requests;
};

const getAllRequest = async (userId) => {
  const requests = await db.request.findAll({
    where: {
      userId
    },
    include: [{
      model: db.trip
    }, {
      model: db.comment
    }]
  });

  return requests;
};

const getOneRequest = async (userId, id) => {
  const request = await db.request.findOne({
    where: {
      userId,
      id
    },
    include: [{
      model: db.trip
    }, {
      model: db.comment
    }]
  });

  return request;
};

const getRequestById = async (requestId) => {
  const request = await db.request.findOne({
    where: {
      id: requestId
    }
  });

  return request;
};

const getManagerRequest = async (userId) => {
  const userRequests = await db.user.findAll({
    attributes: [],
    where: {
      lineManagerId: userId
    },
    include: [{
      model: db.request,
      where: {
        status: 'open'
      },
      include: [{
        model: db.trip
      }]
    }]
  });

  const requests = [];
  await userRequests.forEach(user => {
    requests.push(...user.requests);
  });
  if (requests.length === 0) {
    throw new ErrorHandler('No requests found for Approval', 404);
  }
  return requests;
};

export {
  createRequest,
  getRequestbyStatus,
  getAllRequest,
  getOneRequest,
  getRequestById,
  getManagerRequest
};
