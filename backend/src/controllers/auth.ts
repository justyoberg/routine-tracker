import express from 'express';
import { User } from '../models/User.js';

export const authRouter = express.Router();

// Registration
authRouter.post('/register', async (req, res) => {
  const { username, passwordHash, first, last, email } = req.body;

  const user = new User({
    username,
    passwordHash,
    first,
    last,
    email,
  });

  const savedUser = await user.save();

  res.status(201).json(savedUser);
});
