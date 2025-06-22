/* eslint-disable @typescript-eslint/no-explicit-any */
import { DiscountType } from '@/enums/discountType';
import type { Discount } from '@/entities/discount';

export const mockDiscounts: Discount[] = [
  {
    id: 1,
    deviceId: 1,
    minimumQuantity: 25,
    type: DiscountType.PERCENTAGE,
    amount: 5,
    device: {} as any,
  },
  {
    id: 2,
    deviceId: 1,
    minimumQuantity: 50,
    type: DiscountType.PERCENTAGE,
    amount: 10,
    device: {} as any,
  },
  {
    id: 3,
    deviceId: 1,
    minimumQuantity: 100,
    type: DiscountType.PERCENTAGE,
    amount: 15,
    device: {} as any,
  },
];
