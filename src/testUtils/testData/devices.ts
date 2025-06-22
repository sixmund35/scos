import type { Device } from '@/entities/device';
import { Currency } from '@/enums/currency';
import { WeightUnit } from '@/enums/weightUnit';

export const mockDevices: Device[] = [
  {
    id: 1,
    name: 'Device A',
    price: 100,
    weight: 500,
    weightUnit: WeightUnit.GRAM,
    currency: Currency.USD,
    Discount: {} as any,
    OrderLine: {} as any,
    Stock: {} as any,
  },
];
