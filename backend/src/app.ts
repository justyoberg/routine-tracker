import express from 'express';

import authRouter from './routes/auth.router';
import errorHandler from './middleware/errors';

const app = express();

app.use(express.json());

app.use('/api/auth', authRouter);

app.use(errorHandler);

export default app;
