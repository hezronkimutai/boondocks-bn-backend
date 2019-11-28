
module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('rooms', [{
    hotelId: '1',
    name: 'A2',
    type: 'Double',
    description: 'two beds,kitchen,bathroom',
    image: 'https://www.grandhotelgardone.it/images/slide/rooms/superior-double-room/superior-double-room.jpg',
    cost: 300,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('rooms', null, {})
};
