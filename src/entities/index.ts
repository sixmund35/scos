/* eslint-disable @typescript-eslint/no-namespace */
import { User as _User } from './user';
import { Device as _Device } from './device';
import { Warehouse as _Warehouse } from './warehouse';
import { Discount as _Discount } from './discount';
import { Stock as _Stock } from './stock';
import { ShippingRate as _ShippingRate } from './shipping_rate';
import { Order as _Order } from './order';
import { OrderLine as _OrderLine } from './order_line';

export namespace PrismaModel {
  export class User extends _User {}
  export class Device extends _Device {}
  export class Warehouse extends _Warehouse {}
  export class Discount extends _Discount {}
  export class Stock extends _Stock {}
  export class ShippingRate extends _ShippingRate {}
  export class Order extends _Order {}
  export class OrderLine extends _OrderLine {}

  export const extraModels = [
    User,
    Device,
    Warehouse,
    Discount,
    Stock,
    ShippingRate,
    Order,
    OrderLine,
  ];
}
