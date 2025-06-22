import { GetAllWarehouseByDeviceId } from '../warehouse/getAllWarehouseByDeviceId';
import { inject, injectable } from 'inversify';
import type { IAsyncOperation } from '@/core/interfaces/IOperation';
import type { GetShippingCostRequest } from '@/dtos/shipping/getShippingCost.request';
import type { GetShippingCostResponse } from '@/dtos/shipping/getShippingCost.response';
import { getDistance } from 'geolib';
import type { WarehouseResponse } from '@/dtos/warehouse/warehouse.response';
import { GetAllShippingRate } from './getAllShippingRate';
import { ShippingRateType } from '@/enums/shippingRateType';
import { convert } from '@/helper/weightConverter';
import { WeightUnit } from '@/enums/weightUnit';
import { badRequestResult, successResult } from '@/core/result';
import type { ShippingRate } from '@/entities/shipping_rate';
import { sumBy } from 'lodash';
import type { IResult, IFailureResult } from '@/core/interfaces/IResult';

type ShippingLocation = {
  lat: number;
  lng: number;
};

@injectable('Request')
export class GetShippingCost
  implements IAsyncOperation<GetShippingCostRequest, GetShippingCostResponse>
{
  constructor(
    @inject(GetAllWarehouseByDeviceId)
    private readonly getAllWarehouseByDeviceId: GetAllWarehouseByDeviceId,
    @inject(GetAllShippingRate)
    private readonly getAllShippingRates: GetAllShippingRate,
  ) {}

  async execute(
    request: GetShippingCostRequest,
  ): Promise<IResult<GetShippingCostResponse> | IFailureResult> {
    const shippingRates = await this.getAllShippingRates.execute();
    let totalShippingCost = 0;

    for (const item of request.items) {
      const warehouses = await this.getAllWarehouseByDeviceId.execute({
        deviceId: item.deviceId,
      });

      const sortedWarehouse = this.sortWarehousesByDistance(warehouses.data, {
        lat: request.lat,
        lng: request.lng,
      });

      const shippingDetail = this.getShippingDetails(sortedWarehouse, item, {
        lat: request.lat,
        lng: request.lng,
      });

      if (!shippingDetail) {
        return badRequestResult({
          summary: 'Requested quantity is higher than stock',
        });
      }

      // There is only 1 rate for now
      const rate = shippingRates.data.rates[0]!;

      totalShippingCost += shippingDetail.reduce(
        (acc, detail) =>
          acc +
          this.calculateShippingCost(rate, detail.distance, detail.weight),
        0,
      );
    }

    return successResult({
      amount: Number(totalShippingCost.toFixed(2)),
    });
  }

  getShippingDetails(
    warehouseWithStock: WarehouseResponse[],
    item: {
      quantity: number;
      weight: number;
      weightUnit: WeightUnit;
      deviceId: number;
    },
    shippingAddress: ShippingLocation,
  ): { weight: number; distance: number }[] | null {
    let remainingRequestedQuantity = item.quantity;

    const requestedQuantityIsHigherThanStock =
      remainingRequestedQuantity >
      sumBy(warehouseWithStock, st => st.stock.quantity);
    if (requestedQuantityIsHigherThanStock) {
      return null;
    }

    const result: { weight: number; distance: number }[] = [];

    for (const warehouse of warehouseWithStock) {
      if (remainingRequestedQuantity <= 0) {
        break;
      }

      const quantityToTake = Math.min(
        remainingRequestedQuantity,
        warehouse.stock.quantity,
      );

      if (quantityToTake > 0) {
        const weightInKg = convert(
          item.weightUnit,
          WeightUnit.KILOGRAM,
          quantityToTake * item.weight,
        );

        const distance = getDistance(
          { latitude: warehouse.lat, longitude: warehouse.lng },
          { latitude: shippingAddress.lat, longitude: shippingAddress.lng },
        );

        result.push({
          distance: Math.ceil(distance * 0.001),
          weight: weightInKg,
        });

        remainingRequestedQuantity -= quantityToTake;
      }
    }

    return result;
  }

  private sortWarehousesByDistance(
    warehouses: WarehouseResponse[],
    shippingAddress: ShippingLocation,
  ): WarehouseResponse[] {
    const sorted = warehouses.sort((a, b) => {
      const distanceA = getDistance(
        { latitude: shippingAddress.lat, longitude: shippingAddress.lng },
        { latitude: a.lat, longitude: a.lng },
      );
      const distanceB = getDistance(
        { latitude: shippingAddress.lat, longitude: shippingAddress.lng },
        { latitude: b.lat, longitude: b.lng },
      );
      return distanceA - distanceB;
    });

    return sorted;
  }

  private calculateShippingCost(
    rate: ShippingRate,
    distance: number,
    totalWeightKg: number,
  ): number {
    switch (rate.type) {
      case ShippingRateType.COST_PER_KG_PER_KM:
        return rate.price * totalWeightKg * distance;
      default:
        throw new Error(`Unsupported shipping rate type: ${rate.type}`);
    }
  }
}
