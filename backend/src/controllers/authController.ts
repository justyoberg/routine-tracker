import express, { type Request, type Response } from 'express';
import { User } from '../models/User.js';

export const authRouter = express.Router();

// Register new user
const registerUser = async (req: Request, res: Response) => {
  const { username, password, first, last, email } = req.body;

  const user = new User({
    username,
    password,
    first,
    last,
    email,
  });

  const savedUser = await user.save();

  res.status(201).json(savedUser);
};

export default { registerUser };
