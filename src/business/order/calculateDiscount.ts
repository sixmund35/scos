import type { IAsyncOperation } from '@/core/interfaces/IOperation';
import type { IResult } from '@/core/interfaces/IResult';
import { Repository } from '@/core/repository';
import { successResult } from '@/core/result';
import type { CalculateDiscountRequest } from '@/dtos/order/calculateDiscount.request';
import { DiscountType } from '@/enums/discountType';
import { inject } from 'inversify';

export class CalculateDiscount
  implements IAsyncOperation<CalculateDiscountRequest, number>
{
  constructor(@inject(Repository) private readonly repository: Repository) {}

  async execute(data: CalculateDiscountRequest): Promise<IResult<number>> {
    const discounts = await this.repository.discount.findMany({
      where: {
        deviceId: {
          in: data.items.map(item => item.deviceId),
        },
      },
    });

    if (discounts.length === 0) {
      return successResult(0);
    }

    let totalDiscount = 0;
    data.items.forEach(item => {
      const bestDiscount = this.findBestDiscount(
        item.deviceId,
        item.quantity,
        discounts,
      );

      if (!bestDiscount) {
        return;
      }

      totalDiscount += this.calculateDiscountByType(
        item.quantity,
        item.price,
        bestDiscount,
      );
    });

    return successResult(totalDiscount);
  }

  findBestDiscount(
    deviceId: number,
    quantity: number,
    discounts: {
      deviceId: number;
      minimumQuantity: number;
      type: DiscountType;
      amount: number;
    }[],
  ): {
    deviceId: number;
    minimumQuantity: number;
    type: DiscountType;
    amount: number;
  } | null {
    const applicableDiscounts = discounts.filter(
      discount =>
        discount.deviceId === deviceId && quantity >= discount.minimumQuantity,
    );

    if (applicableDiscounts.length === 0) {
      return null; // No applicable discounts
    }

    applicableDiscounts.sort((a, b) => b.minimumQuantity - a.minimumQuantity);

    return applicableDiscounts[0]!;
  }

  calculateDiscountByType(
    quantity: number,
    price: number,
    discount: {
      type: DiscountType;
      amount: number;
    },
  ): number {
    switch (discount.type) {
      case DiscountType.PERCENTAGE:
        return price * quantity * (discount.amount / 100);
      default:
        return 0;
    }
  }
}
