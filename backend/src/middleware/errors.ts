import { ZodError } from 'zod';
import { type ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      status: 'validation_error',
      errors: err.flatten().fieldErrors,
    });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({ status: 'db_error', message: err.message });
  }

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
  });
};

export default errorHandler;
