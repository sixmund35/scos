import { Device } from './device';

export class Discount {
  id: number;

  minimumQuantity: number;

  type: number;

  deviceId: number;

  device: Device;

  startDate?: Date;

  endDate?: Date;

  amount: number;
}
