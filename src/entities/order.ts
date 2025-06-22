import { User } from './user';
import { OrderLine } from './order_line';

export class Order {
  id: number;

  userId: number;

  user: User;

  status: number;

  discount: number;

  createdAt: Date;

  updatedAt: Date;

  shippingCost: number;

  OrderLine: OrderLine[];
}
