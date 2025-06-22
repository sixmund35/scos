import type { IAsyncOperation, IResult } from '@/core/interfaces/iOperation';
import type { VerifyOrderRequest } from '@/dtos/order/verifyOrder.request';
import type { VerifyOrderResponse } from '@/dtos/order/verifyOrder.response';
import { inject, injectable } from 'inversify';
import { GetShippingCost } from '../shipping/getShippingCost';
import { Repository } from '@/core/repository';
import { WeightUnit } from '@/enums/weightUnit';
import { CalculateDiscount } from './calculateDiscount';
import { badRequestResult, notFoundResult, successResult } from '@/core/result';

interface Device {
  id: number;
  price: number;
}

type OrderItem = {
  quantity: number;
  price: number;
  deviceId: number;
};

@injectable('Request')
export class VerifyOrder
  implements IAsyncOperation<VerifyOrderRequest, VerifyOrderResponse>
{
  constructor(
    @inject(GetShippingCost) private readonly getShippingCost: GetShippingCost,
    @inject(Repository) private readonly repository: Repository,
    @inject(CalculateDiscount)
    private readonly calculateDiscount: CalculateDiscount,
  ) {}

  async execute(
    request: VerifyOrderRequest,
  ): Promise<IResult<VerifyOrderResponse>> {
    const devices = await this.repository.device.findMany({
      where: {
        id: {
          in: request.items.map(item => item.deviceId),
        },
      },
    });

    const orderItems = this.merge(devices, request.items);

    if (!orderItems) {
      return notFoundResult({} as VerifyOrderResponse, 'Device id not found');
    }

    const shippingCost = await this.getShippingCost.execute({
      ...request.shippingAddress,
      items: request.items.map(item => {
        const device = devices.find(d => d.id === item.deviceId);
        return {
          quantity: item.quantity,
          weight: device?.weight ?? 0,
          weightUnit: device?.weightUnit ?? WeightUnit.GRAM,
          deviceId: device?.id ?? 0,
        };
      }),
    });

    if (shippingCost.errors) {
      return badRequestResult({} as VerifyOrderResponse, shippingCost.errors);
    }

    const discount = await this.calculateDiscount.execute({
      items: request.items.map(item => {
        const device = devices.find(d => d.id === item.deviceId);
        return {
          deviceId: device?.id ?? 0,
          quantity: item.quantity,
          price: device?.price ?? 0,
        };
      }),
    });

    const subTotal = orderItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    const isValid = this.verifyIfShippingCostIsValid(
      subTotal,
      shippingCost.data.amount,
      discount.data,
    );

    return successResult({
      subTotal,
      isValid,
      discount: discount.data,
      shippingCost: shippingCost.data.amount,
      total: subTotal - discount.data + shippingCost.data.amount,
    });
  }

  verifyIfShippingCostIsValid(
    subTotal: number,
    shippingCost: number,
    discount: number,
  ) {
    return shippingCost <= 0.15 * (subTotal - discount);
  }

  merge(
    devices: Device[],
    items: VerifyOrderRequest['items'],
  ): OrderItem[] | null {
    const result = items.map(item => {
      const device = devices.find(d => d.id === item.deviceId);
      if (!device) {
        return null;
      }

      return {
        ...item,
        deviceId: device.id,
        price: device.price,
      };
    });

    if (result.some(item => !item)) {
      return null;
    }

    return result as OrderItem[];
  }
}
