import chaiHttp from 'chai-http';
import { use, request, expect } from 'chai';
import app from '../app';
import db from '../models';

use(chaiHttp);

const prefix = '/api/v1';
describe('/auth/signin', () => {
  before(async () => {
    try {
      await db.user.destroy({ where: {}, force: true });
    } catch (error) {
      return error;
    }
  });

  it('should login registered user', async () => {
    try {
      const res = await request(app)
        .post(`${prefix}/auth/signin`)
        .send({
          email: 'john@mccain.com',
          password: '12345678',
        });
      expect(res.status).eql(200);
    } catch (error) {
      return error;
    }
  });

  it('should not login unregistered user', async () => {
    try {
      const res = await request(app)
        .post(`${prefix}/auth/signin`)
        .send({
          email: 'unregistered@unregistered.com',
          password: 'unregistered',
        });
      expect(res.status).eql(404);
    } catch (error) {
      return error;
    }
  });

  it('should not login valid user with wrong password', async () => {
    try {
      const res = await request(app)
        .post(`${prefix}/auth/signin`)
        .send({
          email: 'john@mccain.com',
          password: 'wrong_password',
        });
      expect(res.status).eql(400);
    } catch (error) {
      return error;
    }
  });
  it('should not login user with invalid email', async () => {
    try {
      const res = await request(app)
        .post(`${prefix}/auth/signin`)
        .send({
          email: 'john@mccaincom',
          password: '12345678'
        });
      expect(res.status).eql(400);
    } catch (error) {
      return error;
    }
  });
});
