import express from 'express';
import { User } from '../models/User.js';

export const usersRouter = express.Router();

usersRouter.post('/', async (req, res) => {
  const { username, first, last, email } = req.body;

  const user = new User({
    username,
    first,
    last,
    email,
  });

  const savedUser = await user.save();

  res.status(201).json(savedUser);
});
