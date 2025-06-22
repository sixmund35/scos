import { Device } from './device';
import { Warehouse } from './warehouse';

export class Stock {
  quantity: number;

  deviceId: number;

  warehouseId: number;

  device: Device;

  warehouse: Warehouse;
}
