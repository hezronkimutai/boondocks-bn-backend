import chai, { expect, assert } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import { EventEmitter } from 'events';
import httpMocks from 'node-mocks-http';
import checkTokenMiddleware from '../../../middlewares/checkToken';
import truncate from '../../scripts/truncate';

chai.use(chaiHttp);

describe('Unit tests for check token verification middleware', () => {
  before(async () => {
    await truncate();
  });

  it('check token if its valid', (done) => {
    const buildResponse = () => httpMocks.createResponse({ eventEmitter: EventEmitter });
    const response = buildResponse();
    const request = httpMocks.createRequest({
      method: '',
      url: '/api/v1',
      query: {
        token: 'noifhenuxrsd47893yt54tuogo'
      }
    });
    response.on('end', async () => {
      process.on('unhandledRejection', error => assert.fail('expected', 'actual', error.stack));
      // eslint-disable-next-line no-underscore-dangle
      expect(await response._getJSONData()).to.deep.equal({
        status: 'error',
        message: 'invalid token, Please try to regenerate another email'
      });
      return done();
    });
    checkTokenMiddleware(request, response);
  });
});
