import request from 'supertest';
import app from '../../src/app';
import mongoose from 'mongoose';
import { connectDB, disconnectDB } from '../../src/db';

describe('authentication tests', () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await disconnectDB();
  });

  // Wipe the DB
  afterEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key]?.deleteMany({});
    }
  });

  // Registration
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
    if (response.status !== 201) {
      console.error('Failed:', response.body);
    }
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
});
