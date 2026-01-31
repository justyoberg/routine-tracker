import express, { type Request, type Response } from 'express';
import authServices from '../services/auth.services';

export const authRouter = express.Router();

// Register new user
const registerUser = async (req: Request, res: Response) => {
  res.status(201).json(await authServices.createUser(req.body));
};

//const login = async (req: Request, res: Response) => {};

export default { registerUser };
