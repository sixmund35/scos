import { inject, injectable } from 'inversify';
import type {
  IAsyncOperation,
  IResult,
} from '../../core/interfaces/iOperation';
import { type User } from '@/prisma/client';
import { Repository } from '@/core/repository';

@injectable('Request')
export class GetHelloWorld implements IAsyncOperation<void, User> {
  constructor(@inject(Repository) private repository: Repository) {}

  public async execute(): Promise<IResult<User>> {
    const user: User = await this.repository.user.create({
      data: {
        firstName: 'John',
        lastName: 'Doe',
        middleName: 'M',
        age: 99,
      },
    });

    return {
      statusCode: 200,
      data: user,
    };
  }
}
