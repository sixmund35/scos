import type { GetAllShippingRateResponse } from '@/dtos/shipping/getAllShippingRate.response';
import { Currency } from '@/enums/currency';
import { ShippingRateType } from '@/enums/shippingRateType';

export const mockShippingRates: GetAllShippingRateResponse = {
  rates: [
    {
      id: 1,
      price: 0.01,
      type: ShippingRateType.COST_PER_KG_PER_KM,
      currency: Currency.USD,
    },
  ],
};
