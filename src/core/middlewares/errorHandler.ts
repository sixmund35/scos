import { type Request, type Response, type NextFunction } from 'express';
import { ZodError } from 'zod';
import { respond } from '../respond';
import { badRequestResult } from '../result';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (err instanceof ZodError || err.name === 'ZodError') {
    respond(res, badRequestResult({}, (err as ZodError).issues));
  } else {
    res.status(500).send({
      message: 'Error occurred',
      inner: err.message,
    });
  }

  next();
};
