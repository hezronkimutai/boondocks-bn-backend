import chai, { expect, assert } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import { EventEmitter } from 'events';
import httpMocks from 'node-mocks-http';
import userController from '../../../controllers/users.controller';
import userData from '../../mock-data/verification.data';
import truncate from '../../scripts/truncate';
import db from '../../../models';

chai.use(chaiHttp);

describe('Unit tests for Email verification controller', () => {
  describe('verification email', () => {
    before(async () => {
      await truncate();
      await db.user.create(userData.user2);
      await db.user.create(userData.user3);
    });

    it('verify user email successfully unittest', (done) => {
      const buildResponse = () => httpMocks.createResponse({ eventEmitter: EventEmitter });
      const response = buildResponse();
      const request = httpMocks.createRequest({
        method: 'GET',
        url: '/api/v1/auth/verification',
      });
      response.locals.user = userData.user2;
      response.on('end', async () => {
        process.on('unhandledRejection', error => assert.fail('expected', 'actual', error.stack));
        // eslint-disable-next-line no-underscore-dangle
        expect(await response._getJSONData()).to.deep.equal({
          status: 'success',
          message: 'Email has been verified successfully, please proceed to log in'
        });
        return done();
      });
      userController.verifyAccount(request, response);
    });

    it('Should not verify twice', (done) => {
      const buildResponse = () => httpMocks.createResponse({ eventEmitter: EventEmitter });
      const response = buildResponse();
      const request = httpMocks.createRequest({
        method: 'GET',
        url: '/api/v1/auth/verification',
      });
      response.locals.user = userData.user3;
      response.on('end', async () => {
        process.on('unhandledRejection', error => assert.fail('expected', 'actual', error.stack));
        // eslint-disable-next-line no-underscore-dangle
        expect(await response._getJSONData()).to.deep.equal({
          status: 'error',
          message: 'you are already verified, please login to proceed'
        });
        return done();
      });
      userController.verifyAccount(request, response);
    });
  });

  describe('Resend verification email', () => {
    before(async () => {
      await truncate();
      await db.user.create(userData.user2);
    });

    it('resend verification email successfully', (done) => {
      const buildResponse = () => httpMocks.createResponse({ eventEmitter: EventEmitter });
      const response = buildResponse();
      const request = httpMocks.createRequest({
        method: 'GET',
        url: '/api/v1/auth/verification',
        query: {
          email: userData.user2.email
        }
      });
      response.on('end', async () => {
        process.on('unhandledRejection', error => assert.fail('expected', 'actual', error));
        // eslint-disable-next-line no-underscore-dangle
        expect(await response._getJSONData()).to.deep.equal({
          status: 'success',
          message: 'Email has been resent successfully, please check your mail'
        });
        return done();
      });
      userController.resendEmail(request, response);
    });

    it('verifications\' email does not exist', (done) => {
      const buildResponse = () => httpMocks.createResponse({ eventEmitter: EventEmitter });
      const response = buildResponse();
      const request = httpMocks.createRequest({
        method: 'GET',
        url: '/api/v1/auth/verification',
        query: {
          email: 'test@test.com'
        }
      });
      response.on('end', async () => {
        process.on('unhandledRejection', error => assert.fail('expected', 'actual', error));
        // eslint-disable-next-line no-underscore-dangle
        expect(await response._getJSONData()).to.deep.equal({
          status: 'error',
          message: 'No account with such email exists, please sign up'
        });
        return done();
      });
      userController.resendEmail(request, response);
    });
  });
});
