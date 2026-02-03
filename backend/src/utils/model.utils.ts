import { z } from 'zod';
import { type Constraint } from '../constants/user.constraints';

export const minMessage = (c: Constraint) => {
  return `${c.FIELD} must be atleast ${c.MIN} characters.`;
};

export const maxMessage = (c: Constraint) => {
  return `${c.FIELD} cannot exceed ${c.MAX} characters.`;
};

export const dynamicZodString = (c: Constraint) => {
  return z.string().min(c.MIN, minMessage(c)).max(c.MAX, maxMessage(c)).trim();
};
