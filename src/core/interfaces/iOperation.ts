import type { IFailureResult, IResult } from './IResult';

export interface IOperation<TIn, TOut> {
  execute(data?: TIn): IResult<TOut>;
}

export interface IAsyncOperation<TIn, TOut> {
  execute(data: TIn): Promise<IResult<TOut> | IFailureResult>;
}
