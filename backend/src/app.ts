import express from 'express';
import { connectDB } from './db.js';
import authRouter from './routes/authRouter.js';

export const app = express();

connectDB();

app.use(express.static('dist'));
app.use(express.json());
// app.use(middleware)

app.use('/api/auth', authRouter);
