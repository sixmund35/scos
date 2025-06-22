import { Order } from './order';

export class User {
  id: number;

  firstName: string;

  middleName: string;

  lastName: string;

  age: number;

  createdAt: Date;

  updatedAt: Date;

  Order: Order[];
}
