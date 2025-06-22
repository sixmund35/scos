export interface CalculateDiscountRequest {
  items: {
    deviceId: number;
    quantity: number;
    price: number;
  }[];
}
