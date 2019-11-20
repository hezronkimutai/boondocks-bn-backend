import chaiHttp from 'chai-http';
import { use, request, should } from 'chai';
import app from '../app';
import db from '../models';
import tripsData from './mock-data/trips-data';
import Hash from '../utils/hash';
import tokenizer from '../utils/jwt';

should();
use(chaiHttp);

const prefix = '/api/v1';

describe('/trips/oneway', () => {
  let token = '';
  before(async () => {
    await db.trip.destroy({ where: {}, force: true });
    await db.room.destroy({ where: {}, force: true });
    await db.hotel.destroy({ where: {}, force: true });
    await db.user.destroy({ where: {}, force: true });
    await db.room.create(tripsData.trips[0]);
    await db.room.create(tripsData.trips[1]);
    await db.trip.create(tripsData.trips[0]);
    await db.hotel.create(tripsData.hotels[0]);
    await db.user.create({
      firstName: 'John',
      lastName: 'McCain',
      password: Hash.generateSync('1234567e'),
      email: 'john@mccain.com'
    });
    token = await tokenizer.signToken({
      id: 1,
      email: 'john@mccain.com',
      isVerified: 1
    });
  });

  it('should be able to create a new one way trip request', (done) => {
    request(app)
      .post(`${prefix}/trips/oneway`)
      .set('Authorization', `Bearer ${token}`)
      .send(tripsData.trips[0])
      .end((err, res) => {
        res.status.should.be.eql(201);
        const { data } = res.body;
        data.should.be.an('object');
        data.should.have.property('hotelId');
        done();
      });
  });
});
