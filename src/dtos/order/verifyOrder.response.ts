export interface VerifyOrderResponse {
  subTotal: number;
  total: number;
  discount: number;
  shippingCost: number;
  isValid: boolean;
}
