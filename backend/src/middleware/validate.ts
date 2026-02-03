import { type Request, type Response, type NextFunction } from 'express';
import { type ZodType } from 'zod';
import { type ValidatedRequest } from '../types/ValidatedRequest';

export const validate =
  <T extends ZodType<ValidatedRequest>>(schema: T) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    const parsed = await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    Object.assign(req.body, parsed.body);

    if (parsed.query) {
      Object.assign(req.query, parsed.query);
    }

    if (parsed.params) {
      Object.assign(req.params, parsed.params);
    }

    next();
  };
