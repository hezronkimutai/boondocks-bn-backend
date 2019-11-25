export default {
  trips: [{
    leavingFrom: 'Kigali',
    goingTo: 'Nairobi',
    travelDate: '2019-11-18',
    returnDate: '2019-11-18',
    reason: 'visit our agents',
    hotelId: 1,
    type: 'return',
    rooms: [1]
  },
  {
    leavingFrom: 'Kigali',
    goingTo: 'Nairobi',
    travelDate: '2019-11-18',
    returnDate: '2019-11-18',
    reason: 'visit our agents',
    hotelId: 1,
    type: 'return',
    rooms: [1]
  }, {
    leavingFrom: 'Kampala',
    goingTo: 'Lagos',
    travelDate: '2019-11-18',
    returnDate: '2019-11-18',
    reason: 'visit our new country office',
    hotelId: 1,
    type: 'return',
    rooms: [2]
  },
  {
    leavingFrom: 'Kigali',
    goingTo: 'Nairobi',
    travelDate: '2019-11-18',
    reason: 'visit our agents',
    hotelId: 1,
    type: 'one way',
    rooms: [1],
  }, {
    leavingFrom: 'Kampala',
    goingTo: 'Lagos',
    travelDate: '2019-11-18',
    returnDate: '2019-11-18',
    reason: 'visit our new country office',
    hotelId: 1,
    type: 'return',
    rooms: [2, 'play']
  },
  {
    leavingFrom: 'Cairo',
    goingTo: 'Accra',
    travelDate: '2019-11-18',
    returnDate: '2019-11-18',
    reason: 'visit our new country office',
    hotelId: 1,
    type: 'return',
    rooms: [2]
  },
  {
    leavingFrom: 'Kigali',
    goingTo: 'Nairobi',
    travelDate: '2019-11-18',
    reason: 'visit our agents',
    hotelId: 1,
    type: 'one way',
    rooms: [3],
  }],
  rooms: [{
    id: 1,
    hotelId: 1,
    name: 'Muhabura',
    type: 'return',
    description: 'The best room ever',
    image: 'room.png',
    cost: 5000,
    status: 'available',
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
  },
  {
    id: 3,
    hotelId: 1,
    name: 'Muhabura',
    type: 'return',
    description: 'The best room ever',
    image: 'room.png',
    cost: 5000,
    status: 'available',
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
