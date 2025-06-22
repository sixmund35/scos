import type { IResult } from './interfaces/iOperation';

export const successResult = <T>(data: T): IResult<T> => {
  return {
    statusCode: 200,
    data,
  };
};

export const badRequestResult = <T>(data: T, errors: unknown): IResult<T> => {
  return {
    data,
    statusCode: 400,
    errors,
  };
};
