import { connectDB, disconnectDB } from '../src/db';
import { wipeDB } from './utils/db';

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await disconnectDB();
});
