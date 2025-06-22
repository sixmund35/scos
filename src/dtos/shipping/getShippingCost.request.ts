import type { WeightUnit } from '@/enums/weightUnit';

export interface GetShippingCostRequest {
  lat: number;
  lng: number;
  items: {
    quantity: number;
    weight: number;
    weightUnit: WeightUnit;
    deviceId: number;
  }[];
}
