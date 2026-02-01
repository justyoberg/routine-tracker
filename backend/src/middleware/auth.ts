import { type Response, type NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { type AuthenticatedRequest } from '../types/AuthenticatedRequest';
import { AuthError } from '../utils/AuthError';

export function authMiddleware(
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AuthError('No token provided', 401);
  }

  const [, token] = authHeader.split(' ');

  if (!token) {
    throw new AuthError('Invalid token format', 401);
  }

  req.user = verifyToken(token);
  next();
}
