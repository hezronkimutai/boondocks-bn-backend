export default {
  trips: [{
    leavingFrom: 'Kigali',
    type: 'one way',
    goingTo: 'Nairobi',
    travelDate: '2019-11-18',
    reason: 'visit our agents',
    hotelId: 1,
    rooms: [1]
  },
  {
    leavingFrom: 'Kigali',
    type: 'one way',
    goingTo: 'Nairobi',
    travelDate: '2019-11-18',
    hotelId: 1,
    rooms: [1]
  },
  {
    leavingFrom: 'Kigali',
    goingTo: 'Nairobi',
    travelDate: '2019-11-18',
    reason: 'visit our agents',
    hotelId: 1,
    userId: 1,
    rooms: [2]
  }],
  rooms: [{
    id: 1,
    hotelId: 1,
    name: 'Muhabura',
    type: 'return',
    description: 'The best room ever',
    image: 'room.png',
    cost: 5000,
    status: 'available'
  },
  {
    id: 2,
    hotelId: 1,
    name: 'Muhabura',
    type: 'return',
    description: 'The best room ever',
    image: 'room.png',
    cost: 5000,
    status: 'reserved'
  }],
  bookings: [{
    userId: 1,
    hotelId: 1,
    roomId: 1
  }],
  hotels: [{
    locationId: 1,
    name: 'Marriot',
    image: 'image.png',
    description: 'hello world',
    services: 'Catering'
  }],
};
