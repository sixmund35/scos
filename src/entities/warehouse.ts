import { Stock } from './stock';

export class Warehouse {
  id: number;

  name: string;

  lat: number;

  lng: number;

  createdAt: Date;

  updatedAt: Date;

  Stock: Stock[];
}
