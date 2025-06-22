import { Discount } from './discount';
import { Stock } from './stock';
import { OrderLine } from './order_line';

export class Device {
  id: number;

  name: string;

  weight: number;

  weightUnit: number;

  price: number;

  currency: number;

  Discount: Discount[];

  Stock: Stock[];

  OrderLine: OrderLine[];
}
