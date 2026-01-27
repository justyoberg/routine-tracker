import express from 'express';
import authController from '../controllers/authController';
const authRouter = express.Router();

authRouter.post('/register', authController.registerUser);

export default authRouter;
