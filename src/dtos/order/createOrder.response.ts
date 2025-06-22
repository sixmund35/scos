import type { VerifyOrderResponse } from './verifyOrder.response';

export type CreateOrderResponse =
  | {
      subTotal: number;
      total: number;
      discount: number;
      shippingCost: number;
      id: number;
    }
  | VerifyOrderResponse;
