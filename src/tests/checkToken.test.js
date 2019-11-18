/* eslint-disable no-underscore-dangle */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import httpMocks from 'node-mocks-http';
import { verifyUser } from '../middlewares/checkToken';
import testUsers from './mock-data/test-users';
import db from '../models';

chai.use(chaiHttp);

describe('checkToken middleware', () => {
  before(async () => {
    await db.user.destroy({ where: {}, force: true });
    await db.user.create(testUsers[0]);
  });

  it('verifyUser() should return error when no token provided', (done) => {
    const request = httpMocks.createRequest({
      method: '',
      url: '/api/v1',
      query: {
        token: 'noifhenuxrsd47893yt54tuogo'
      }
    });

    const response = httpMocks.createResponse();
    verifyUser(request, response);
    const res = response._getJSONData(); // short-hand for JSON.parse( response._getData() );
    expect(res.status).to.be.eql('error');
    done();
  });
});
