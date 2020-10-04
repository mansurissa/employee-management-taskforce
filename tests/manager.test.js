import { it, describe, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../app';
import Managers from '../models/managersModel';

const { JWT_KEY } = process.env;

const mockManager = {
  name: 'testEmail',
  phone: '250783509302',
  nId: '1198381256160145',
  email: 'rge92382@cuoly.com',
  password: '123abc!@#',
  dateOfBirth: '01/12/1999',
  position: 'manager',
  status: 'active',
};

const mockToken = `Bearer ${jwt.sign(
  { email: 'email@email.com', managerId: 'fakeids' },
  JWT_KEY
)}`;

describe('Managers tests:', () => {
  beforeEach(async () => {
    await Managers.deleteMany({});
  });
  afterEach(async () => {
    await Managers.deleteMany({});
  });
  it('should Get all managers', async () => {
    const res = await request(app)
      .get('/managers')
      .set('authorization', mockToken);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.a('object');
    expect(res.body.success).to.be.equal(true);
    expect(res.body.message).to.be.equal('successfully got managers');
  });

  it('should delete a managers', async () => {
    const manager = await Managers.create(mockManager);
    await manager.save();

    const res = await request(app)
      .delete(`/managers/${manager._id}/`)
      .set('authorization', mockToken);
    expect(res.status).to.be.equal(201);
    expect(res.body).to.be.a('object');
    expect(res.body.success).to.be.equal(true);
    expect(res.body.message).to.be.equal('deleted successfully');
  });
  console.log('token:', mockToken);

  it('should  verify email to new managers', async () => {
    const manager = await Managers.create(mockManager);
    await manager.save();

    const res = await request(app).get(
      `/managers/verify/${jwt.sign(
        {
          email: manager.email,
          id: manager._id,
        },
        JWT_KEY
      )}`
    );
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.a('object');
    expect(res.body.success).to.be.equal(true);
    expect(res.body.message).to.be.equal(
      'verified, now you are regestred as a manager'
    );
  });
});
