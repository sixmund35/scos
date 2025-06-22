import type { Currency } from '@/enums/currency';
import type { ShippingRateType } from '@/enums/shippingRateType';

export interface ShippingRate {
  price: number;
  currency: Currency;
  type: ShippingRateType;
}

export interface GetAllShippingRateResponse {
  rates: ShippingRate[];
}
