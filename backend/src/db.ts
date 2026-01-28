import 'dotenv/config';
import mongoose from 'mongoose';
import { type NodeEnv, isNodeEnv, requireEnv } from './utils/env.utils';

if (!isNodeEnv(process.env.NODE_ENV)) {
  throw new Error('NODE_ENV is undefined');
}

const NODE_ENV: NodeEnv = process.env.NODE_ENV;

const URI: Record<NodeEnv, string> = {
  production: requireEnv('MONGO_PROD_URI'),
  dev: requireEnv('MONGO_DEV_URI'),
  test: requireEnv('MONGO_TEST_URI'),
};

export const connectDB = async () => {
  try {
    await mongoose.connect(URI[NODE_ENV]);
    console.log('Connected to MongoDB');
  } catch (e) {
    console.error('Mongo connection error: ', e);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  try {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
      console.log('MongoDB connection closed');
    }
  } catch (e) {
    console.error('Mongo disconnect error: ', e);
    process.exit(1);
  }
};
