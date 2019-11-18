module.exports = {
  up: queryInterface => queryInterface.bulkInsert('facilities', [{
    name: 'Muhabura',
    location: 'Kigali',
    createdAt: '2019-12-02',
    updatedAt: '2019-12-02',
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('facilities', null, {})
};
