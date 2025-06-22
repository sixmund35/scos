import { type Response } from 'express';
import type { IResult } from './interfaces/iOperation';

export const respond = (res: Response, result: IResult<object>) => {
  return res.status(result.statusCode).json({
    ...result.data,
    errors: result.errors,
  });
};
