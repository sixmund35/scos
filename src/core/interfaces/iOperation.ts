export interface IResult<T> {
  statusCode: number;
  data: T;
  errors?: unknown;
}

export interface IOperation<TIn, TOut> {
  execute(data?: TIn): IResult<TOut>;
}

export interface IAsyncOperation<TIn, TOut> {
  execute(data: TIn): Promise<IResult<TOut>>;
}
