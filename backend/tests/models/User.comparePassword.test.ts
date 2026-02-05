import mongoose from 'mongoose';
import { User } from '../../src/models/User';
import { wipeDB } from '../utils/db';

describe('User.comparePassword', () => {
  let user;
  beforeAll(async () => {
    await wipeDB();
    await User.syncIndexes();
    user = await User.create({
      username: 'comparetest',
      password: 'password',
      first: 'testfirst',
      last: 'testlast',
      email: 'compare@password.com',
    });
  });

  it('returns true for the correct password', async () => {
    const user = await User.findOne({ username: 'comparetest' }).select(
      '+password',
    );
    expect(user).not.toBeNull();
    expect(await user!.comparePassword('password')).toBe(true);
  });

  it('returns false for the wrong password', async () => {
    const user = await User.findOne({ username: 'comparetest' }).select(
      '+password',
    );
    expect(user).not.toBeNull();
    expect(await user!.comparePassword('wrongpassword')).toBe(false);
  });
});
