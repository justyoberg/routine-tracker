import jwt from 'jsonwebtoken';
import 'dotenv/config';

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is undefined');
}

const JWT_SECRET = process.env.JWT_SECRET;
const EXPIRATION = '1h';

export interface JwtPayload {
  id: string;
  username: string;
}

export const createToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRATION });
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};
