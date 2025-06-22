import { inject, injectable } from 'inversify';
import type { IAsyncOperation, IResult } from '@/core/interfaces/iOperation';
import type { GetAllShippingRateResponse } from '@/dtos/shipping/getAllShippingRate.response';
import { Repository } from '@/core/repository';
import { successResult } from '@/core/result';

@injectable('Request')
export class GetAllShippingRate
  implements IAsyncOperation<void, GetAllShippingRateResponse>
{
  constructor(@inject(Repository) private readonly repository: Repository) {}

  async execute(): Promise<IResult<GetAllShippingRateResponse>> {
    const rates = await this.repository.shippingRate.findMany();

    return successResult({ rates });
  }
}
