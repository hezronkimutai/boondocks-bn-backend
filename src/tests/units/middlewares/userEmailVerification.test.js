import chai, { expect, assert } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import { EventEmitter } from 'events';
import httpMocks from 'node-mocks-http';
import userEmailMiddleware from '../../../middlewares/userEmailVerification';
import truncate from '../../scripts/truncate';

chai.use(chaiHttp);

describe('Unit tests for Email verification middleware', () => {
  before(async () => {
    await truncate();
  });

  it('check token if its valid', (done) => {
    const buildResponse = () => httpMocks.createResponse({ eventEmitter: EventEmitter });
    const response = buildResponse();
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/api/v1/auth/verification',
      query: {
        token: 'noifhenuxrsd47893yt54tuogo'
      }
    });
    response.on('end', async () => {
      process.on('unhandledRejection', error => assert.fail('expected', 'actual', error.stack));
      // eslint-disable-next-line no-underscore-dangle
      expect(await response._getJSONData()).to.deep.equal({
        status: 'error',
        message: 'invalid token, regenerate another token using the link in your verification email'
      });
      return done();
    });
    userEmailMiddleware(request, response);
  });
});
