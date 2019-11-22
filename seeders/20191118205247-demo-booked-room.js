module.exports = {
  up: queryInterface => queryInterface.bulkInsert('bookedRooms', [{
    bookingId: 1,
    roomId: 1,
    createdAt: '2019-12-02',
    updatedAt: '2019-12-02',
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('bookedRooms', null, {})
};
