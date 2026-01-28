import { type Request, type Response, type NextFunction } from 'express';
import { type ZodObject } from 'zod';

export const validate =
  (schema: ZodObject) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  };
