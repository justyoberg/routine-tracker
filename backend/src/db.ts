import 'dotenv/config';
import mongoose from 'mongoose';

const URI =
  process.env.NODE_ENV == 'dev'
    ? process.env.MONGO_DEV_URI
    : process.env.MONGO_PROD_URI;

if (!URI) throw new Error('URI is undefined');

export const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log('Connected to MongoDB');
  } catch (e) {
    console.log('Mongo connection error: ', e);
    process.exit(1);
  }
};
