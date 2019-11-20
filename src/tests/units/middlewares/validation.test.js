import chai, { expect, assert } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import { EventEmitter } from 'events';
import httpMocks from 'node-mocks-http';
import validations from '../../../validation/validation';
import truncate from '../../scripts/truncate';

chai.use(chaiHttp);

describe('Unit tests for checking validations for trips', () => {
  before(async () => {
    await truncate();
  });

  it('check token if its valid', (done) => {
    const buildResponse = () => httpMocks.createResponse({ eventEmitter: EventEmitter });
    const response = buildResponse();
    const request = httpMocks.createRequest({
      method: 'POST',
      url: '/api/v1/trips/oneway',
      body: {}
    });
    response.on('end', async () => {
      process.on('unhandledRejection', error => assert.fail('expected', 'actual', error.stack));
      // eslint-disable-next-line no-underscore-dangle
      expect(await response.statusCode).eql(400);
      return done();
    });
    validations(request, response, done());
  });
});
