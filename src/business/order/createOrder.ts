import type { IAsyncOperation, IResult } from '@/core/interfaces/iOperation';
import type { CreateOrderRequest } from '@/dtos/order/createOrder.request';
import type { CreateOrderResponse } from '@/dtos/order/createOrder.response';
import { VerifyOrder } from './verifyOrder';
import { inject, injectable } from 'inversify';
import { badRequestResult, successResult } from '@/core/result';
import { Repository } from '@/core/repository';
import { OrderStatus } from '@/enums/orderStatus';

@injectable('Request')
export class CreateOrder
  implements IAsyncOperation<CreateOrderRequest, CreateOrderResponse>
{
  constructor(
    @inject(VerifyOrder) private readonly verifyOrder: VerifyOrder,
    @inject(Repository) private readonly repository: Repository,
  ) {}

  async execute(
    data: CreateOrderRequest,
  ): Promise<IResult<CreateOrderResponse>> {
    const verifyResult = await this.verifyOrder.execute(data);

    if (!verifyResult.data.isValid) {
      return badRequestResult(verifyResult.data, '');
    }

    // Assuming that the user is already authenticated and we can get the user from the repository
    const user = await this.repository.user.findFirst();

    const devices = await this.repository.device.findMany({
      where: {
        id: {
          in: data.items.map(item => item.deviceId),
        },
      },
    });

    const order = await this.repository.order.create({
      data: {
        discount: verifyResult.data.discount,
        shippingCost: verifyResult.data.shippingCost,
        status: OrderStatus.PENDING,
        userId: user!.id,
        OrderLine: {
          create: data.items.map(item => ({
            quantity: item.quantity,
            price: devices.find(d => d.id === item.deviceId)?.price ?? 0,
            deviceId: item.deviceId,
          })),
        },
      },
    });

    return successResult({
      ...verifyResult.data,
      id: order.id,
    });
  }
}
