import 'dotenv/config';
import express from 'express';
import { connectDB } from './db.js';

const app = express();
const port = process.env.PORT || 3000;

connectDB();
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
