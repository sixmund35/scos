import { type Request, type Response, type NextFunction } from 'express';
import { ZodError } from 'zod';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
): void => {
  if (err instanceof ZodError || err.name === 'ZodError') {
    res.status(400).send((err as ZodError).issues);
  } else {
    res.status(500).send({
      message: 'Error occurred',
      inner: err.message,
    });
  }

  next();
};
