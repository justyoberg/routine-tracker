import request from 'supertest';
import app from '../../src/app';
import mongoose from 'mongoose';
import { connectDB, disconnectDB } from '../../src/db';
import jwt from 'jsonwebtoken';

describe('authentication tests', () => {
  beforeAll(async () => {
    await connectDB();
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key]?.deleteMany({});
    }
  });

  afterAll(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key]?.deleteMany({});
    }
    await disconnectDB();
  });

  it('should register a new user', async () => {
    const payload = {
      username: 'testuser',
      password: 'password',
      first: 'testfirst',
      last: 'testlast',
      email: 'test@test.com',
    };
    const response = await request(app)
      .post('/api/auth/register')
      .send(payload);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      username: payload.username,
      first: payload.first,
      last: payload.last,
      email: payload.email,
      routines: [],
      id: expect.any(String),
    });
  });

  it('should prevent registering an existing user', async () => {
    const payload = {
      username: 'testuser',
      password: 'password',
      first: 'testfirst',
      last: 'testlast',
      email: 'test@test.com',
    };
    const response = await request(app)
      .post('/api/auth/register')
      .send(payload);
    expect(response.status).toBe(409);
    expect(response.body.status).toBe('dup_key_error');
  });

  it('should prevent registering with missing field', async () => {
    const payload = {
      username: 'testuser',
      password: 'password',
      first: 'testfirst',
      last: 'testlast',
    };
    const response = await request(app)
      .post('/api/auth/register')
      .send(payload);
    expect(response.status).toBe(400);
    expect(response.body.status).toBe('validation_error');
  });

  it('should login and contain valid token', async () => {
    const payload = {
      username: 'testuser',
      password: 'password',
    };
    const response = await request(app).post('/api/auth/login').send(payload);
    expect(response.status).toBe(200);

    const { token, user } = response.body;
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    expect(decoded).toHaveProperty('id');
    expect(decoded).toHaveProperty('username', payload.username);

    expect(user).toBeDefined();
    expect(mongoose.Types.ObjectId.isValid(user.id)).toBe(true);

    expect(user.first).toBe('testfirst');
  });

  it('should prevent login with wrong password', async () => {
    const payload = {
      username: 'testuser',
      password: 'wrongpassword',
    };
    const response = await request(app).post('/api/auth/login').send(payload);
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid username or password');
  });

  it('should prevent login with non-existant user', async () => {
    const payload = {
      username: 'doesntexist',
      password: 'password',
    };
    const response = await request(app).post('/api/auth/login').send(payload);
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid username or password');
  });

  // TODO: Add logout/token invalidation tests
});
