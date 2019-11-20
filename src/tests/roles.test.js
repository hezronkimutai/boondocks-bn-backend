import chaiHttp from 'chai-http';
// eslint-disable-next-line object-curly-newline
import { use, request, expect, should } from 'chai';
import app from '../app';
import prepareForTest from './scripts/beforeHook_role';

should();
use(chaiHttp);

const prefix = '/api/v1';
const invalidToken = 'invalidToken';
let superAdministratorToken;
let requesterToken;

describe('/GET /auth/users', () => {
  before(async () => {
    const tokens = await prepareForTest();
    superAdministratorToken = tokens.superAdministratorTokenExport;
    requesterToken = tokens.requesterTokenExport;
  });
  it('successfully returns all users if requested by super_administrator', async () => {
    const res = await request(app)
      .get(`${prefix}/auth/users`)
      .set('Authorization', superAdministratorToken);
    expect(res.status).eql(200);
    expect(res.body.message).eql('successfully retrieved all users');
  });

  it('fail to fetch users if requested by user with non-super_administrator role', async () => {
    const res = await request(app)
      .get(`${prefix}/auth/users`)
      .set('Authorization', requesterToken);
    expect(res.status).eql(403);
    expect(res.body.message).eql('insufficient privileges');
  });

  it('fail to fetch users if requested by user with invalid token', async () => {
    const res = await request(app)
      .get(`${prefix}/auth/users`)
      .set('Authorization', invalidToken);
    expect(res.status).eql(401);
    expect(res.body.message).eql('Invalid token, please login');
  });
});

describe('/PATCH /auth/user/role', () => {
  it('Allow user with the super_administrator role to change another user\'s role', async () => {
    const res = await request(app)
      .patch(`${prefix}/auth/user/role`)
      .set('Authorization', superAdministratorToken)
      .send({
        email: 'random@requester.com',
        role: 'manager'
      });
    expect(res.status).eql(200);
    expect(res.body.message).eql('user role updated');
    res.body.data.should.have.property('role').eql('manager');
  });

  it('Don\'t allow user without the super_administrator role to change another user\'s role', async () => {
    const res = await request(app)
      .patch(`${prefix}/auth/user/role`)
      .send({
        email: 'random@requester.com',
        role: 'travel_team_member'
      })
      .set('Authorization', requesterToken);
    expect(res.status).eql(403);
    expect(res.body.message).eql('insufficient privileges');
  });

  it('Don\'t allow user with an invalid token to change another user\'s role', async () => {
    const res = await request(app)
      .patch(`${prefix}/auth/user/role`)
      .send({
        email: 'random@requester.com',
        role: 'travel_team_member'
      })
      .set('Authorization', invalidToken);
    expect(res.status).eql(401);
    expect(res.body.message).eql('Invalid token, please login');
  });

  it('Return error message for non-existent email', async () => {
    const res = await request(app)
      .patch(`${prefix}/auth/user/role`)
      .send({
        email: 'nonexisting@user.com',
        role: 'travel_team_member'
      })
      .set('Authorization', superAdministratorToken);
    expect(res.status).eql(404);
    expect(res.body.message).eql('user not found');
  });
});
