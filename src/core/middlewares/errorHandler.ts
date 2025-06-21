import { type Request, type Response, type NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  res.status(500).send({
    message: 'Error occurred',
    inner: err.message,
  });
};
