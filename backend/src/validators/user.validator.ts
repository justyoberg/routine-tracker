import { z } from 'zod';
import { dynamicZodString } from '../utils/model.utils';
import { USER_CONSTRAINTS } from '../constants/user.constraints';

const UserZodSchema = z.object({
  username: dynamicZodString(USER_CONSTRAINTS.USERNAME),
  password: dynamicZodString(USER_CONSTRAINTS.PASSWORD),
  first: dynamicZodString(USER_CONSTRAINTS.FIRST_NAME),
  last: dynamicZodString(USER_CONSTRAINTS.LAST_NAME),
  email: dynamicZodString(USER_CONSTRAINTS.EMAIL).toLowerCase().email(),
});

export const RegisterUserSchema = z.object({
  body: UserZodSchema,
});

export type UserBase = z.infer<typeof UserZodSchema>;
