import express from 'express';
import authController from '../controllers/auth.controller';
import { validate } from '../middleware/validate';
import { RegisterUserSchema } from '../validators/user.validator';
import { LoginSchema } from '../validators/login.validator';

const authRouter = express.Router();

authRouter.post(
  '/register',
  validate(RegisterUserSchema),
  authController.registerUser,
);
authRouter.post('/login', validate(LoginSchema), authController.login);

export default authRouter;
