import { it, describe, afterEach, beforeEach } from 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../app';
import Employee from '../models/employeesModel';

const { JWT_KEY } = process.env;

describe('Employees read ', () => {
  const mockToken = `Bearer ${jwt.sign(
    { email: 'fake email', managerId: 'fake id ' },
    JWT_KEY
  )}`;
  const mockUser = {
    name: 'mananiza',
    email: 'mananiza@gmail.com',
    phone: '0787234755',
    status: 'inactive',
    position: 'secretary',
    birth: '02/03/2001',
    nId: '1995678675454321',
  };

  beforeEach(async () => {
    await Employee.deleteMany({});
  });
  afterEach(async () => {
    await Employee.deleteMany({});
  });
  it('should get all employees', async () => {
    const res = await request(app).get('/employees');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('success', true);
    expect(res.body).to.have.property('message', ' employees fetched');
    expect(res.body).to.have.property('data');
  });
  it('should create an employee', async () => {
    const res = await request(app)
      .post('/employees')
      .send(mockUser)
      .set('authorization', mockToken);

    expect(res.status).to.be.equal(201);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('success', true);
    expect(res.body).to.have.property('message', ' user created successfully');
  });
  it('should fail to create an employee if already exists', async () => {
    const user = await Employee.create(mockUser);
    await user.save();

    const res = await request(app)
      .post('/employees')
      .send(mockUser)
      .set('authorization', mockToken);

    expect(res.status).to.be.equal(500);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('success', false);
  });

  it('should update employee ', async () => {
    const user = await Employee.create(mockUser);
    await user.save();

    const res = await request(app)
      .put(`/employees/${user._id}`)
      .send({ name: 'hacker2' })
      .set('authorization', mockToken);
    expect(res.status).to.be.equal(201);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('success', true);
    expect(res.body.data.employee.name).to.be.equal('hacker2');
  });

  it('should delete an employee ', async () => {
    const user = await Employee.create(mockUser);
    await user.save();

    const res = await request(app)
      .delete(`/employees/${user._id}`)
      .set('authorization', mockToken);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.a('object');
    expect(res.body).to.be.have.property('success');
    expect(res.body.success).to.be.equal(true);

    const res2 = await request(app)
      .delete(`/employees/${user._id}`)
      .set('authorization', mockToken);
    expect(res2.status).to.be.equal(404);
  });

  it('should search employee ', async () => {
    const user = await Employee.create(mockUser);
    await user.save();

    const res = await request(app)
      .post('/employees/search')
      .send({ name: 'man' })
      .set('authorization', mockToken);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property('success', true);
    expect(res.body).to.have.property('found');
  });

  it('should suspend an employee ', async () => {
    const user = await Employee.create(mockUser);
    await user.save();

    const res = await request(app)
      .put(`/employees/${user._id}/suspend`)
      .send({ suspended: true })
      .set('authorization', mockToken);
    expect(res.status).to.be.equal(201);
    expect(res.body).to.have.property('success', true);

    const res2 = await request(app)
      .put(`/employees/${user._id}/suspend`)
      .send({ suspended: false })
      .set('authorization', mockToken);
    expect(res2.status).to.be.equal(500);
    expect(res2.body).to.have.property('success', false);
    expect(res2.body.message).to.be.equal('employee is back');
  });

  it('should activate or disactivate an employee ', async () => {
    const user = await Employee.create(mockUser);
    await user.save();

    const res = await request(app)
      .put(`/employees/${user._id}/activate`)
      .send({ status: ' active' })
      .set('authorization', mockToken);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property('success', true);
    expect(res.body).to.have.property('message', 'activated successfully');
  });
});
