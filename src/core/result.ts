import type { IErrors } from './interfaces/IErrors';
import type { IFailureResult, IResult } from './interfaces/IResult';

export const successResult = <T>(data: T): IResult<T> => {
  return {
    statusCode: 200,
    data,
    success: true,
  };
};

export const badRequestResult = (errors: IErrors): IFailureResult => {
  return {
    statusCode: 400,
    errors,
    success: false,
  };
};

export const notFoundResult = (errors: IErrors): IFailureResult => {
  return {
    success: false,
    statusCode: 404,
    errors,
  };
};

export const isFailureResult = (
  result: IResult<unknown> | IFailureResult,
): result is IFailureResult => {
  return !result.success;
};
