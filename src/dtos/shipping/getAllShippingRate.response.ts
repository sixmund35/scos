export interface GetAllShippingRateResponse {
  rates: {
    id: number;

    price: number;

    type: number;

    currency: number;
  }[];
}
