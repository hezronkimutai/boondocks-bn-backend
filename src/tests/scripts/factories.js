import db from '../../models';

const userfactory = async (data) => {
  await db.user.create(data);
};

const hotelfactory = async (data) => {
  await db.hotel.create(data);
};

const roomfactory = async (data) => {
  await db.room.create(data);
};

const tripfactory = async (data) => {
  await db.room.create(data);
};

export {
  userfactory,
  hotelfactory,
  roomfactory,
  tripfactory

};
