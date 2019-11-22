module.exports = {
  up: queryInterface => queryInterface.bulkInsert('rooms', [{
    name: 'Virunga',
    facilityId: 1,
    type: 'VVIP',
    createdAt: '2019-12-02',
    updatedAt: '2019-12-02'
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('rooms', null, {})
};
