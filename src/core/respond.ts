import { type Response } from 'express';
import { isFailureResult } from './result';
import type { IResult, IFailureResult } from './interfaces/IResult';

export const respond = (
  res: Response,
  result: IResult<object> | IFailureResult,
) => {
  if (isFailureResult(result)) {
    return res.status(result.statusCode).json({
      errors: result.errors,
    });
  } else {
    return res.status(result.statusCode).json(result.data);
  }
};
