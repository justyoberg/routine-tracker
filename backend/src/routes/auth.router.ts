import express from 'express';
import authController from '../controllers/auth.controller';
import { validate } from '../middleware/validate';
import { RegisterUserSchema } from '../validators/user.validator';

const authRouter = express.Router();

authRouter.post(
  '/register',
  validate(RegisterUserSchema),
  authController.registerUser,
);

export default authRouter;
