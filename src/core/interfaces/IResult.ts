import type { IErrors } from './IErrors';

export interface IResult<T> {
  statusCode: number;
  data: T;
  success: boolean;
}

export interface IFailureResult {
  statusCode: number;
  errors: IErrors;
  success: boolean;
}
