import { Order } from './order';
import { Device } from './device';

export class OrderLine {
  id: number;

  orderId: number;

  order: Order;

  deviceId: number;

  device: Device;

  quantity: number;

  price: number;
}
