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

describe('/trips/{ oneway | return }', () => {
  let token = '';
  before(async () => {
    await db.trip.destroy({ where: {}, force: true });
    await db.room.destroy({ where: {}, force: true });
    await db.hotel.destroy({ where: {}, force: true });
    await db.user.destroy({ where: {}, force: true });
    await db.room.create(tripsData.rooms[0]);
    await db.room.create(tripsData.rooms[1]);
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

  it('POST /trips/oneway - should be able to create a new one way trip request', (done) => {
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

  it('POST /trips/return - should be able to create a new return trip', (done) => {
    request(app)
      .post(`${prefix}/trips/return`)
      .set('Authorization', `Bearer ${token}`)
      .send(tripsData.trips[1])
      .end((err, res) => {
        res.status.should.be.eql(201);
        const { data } = res.body;
        data.should.be.an('object');
        data.should.have.property('hotelId');
        done();
      });
  });

  it('POST /trips/{ oneway | return } - should not be able to book unavailable room', (done) => {
    request(app)
      .post(`${prefix}/trips/return`)
      .set('Authorization', `Bearer ${token}`)
      .send(tripsData.trips[2])
      .end((err, res) => {
        res.status.should.be.eql(409);
        done();
      });
  });
});
