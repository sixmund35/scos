/* eslint-disable @typescript-eslint/no-explicit-any */
import { injectable } from 'inversify';
import type { IOperation } from '../../core/interfaces/iOperation';

@injectable('Request')
export class ThrowException implements IOperation<void, any> {
  public execute(): any {
    throw new Error('This is an exception from ThrowException operation.');
  }
}
