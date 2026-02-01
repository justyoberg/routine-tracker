import { z } from 'zod';

export const LoginSchema = z.object({
  body: z.object({
    username: z.string(),
    password: z.string(),
  }),
});
