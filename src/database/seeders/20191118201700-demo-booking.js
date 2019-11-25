module.exports = {
  up: queryInterface => queryInterface.bulkInsert('bookings', [{
    facilityId: 1,
    userId: 1,
    createdAt: '2019-12-02',
    updatedAt: '2019-12-02'
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('booking', null, {})
};
