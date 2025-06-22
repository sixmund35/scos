import { test, expect, mock, describe } from 'bun:test';
import { GetShippingCost } from './getShippingCost';
import { successResult } from '@/core/result';
import { GetAllWarehouseByDeviceId } from '../warehouse/getAllWarehouseByDeviceId';
import { GetAllShippingRate } from './getAllShippingRate';
import { WeightUnit } from '@/enums/weightUnit';
import { getDistance } from 'geolib';
import { convert } from '@/helper/weightConverter';
import type { WarehouseResponse } from '@/dtos/warehouse/warehouse.response';
import type { Repository } from '@/core/repository';
import { mockWarehouses } from '@/testUtils/testData/warehouses';
import { mockShippingRates } from '@/testUtils/testData/shippingRates';

describe('getShippingCost', async () => {
  test('calculate shipping cost correctly', async () => {
    const { getAllWarehouseByDeviceId, getAllShippingRates } = prepareMock();
    const getShippingCost = new GetShippingCost(
      getAllWarehouseByDeviceId,
      getAllShippingRates,
    );

    const request = {
      items: [
        {
          deviceId: 1,
          quantity: 2,
          weight: 300,
          weightUnit: WeightUnit.GRAM,
        },
      ],
      lat: 44.639722,
      lng: -70.778889,
    };

    const response = await getShippingCost.execute(request);

    const distanceAsKm = Math.ceil(
      getDistance(
        {
          latitude: mockWarehouses[0]!.lat!,
          longitude: mockWarehouses[0]!.lng!,
        },
        { latitude: request.lat, longitude: request.lng },
      ) * 0.001,
    );

    const totalWeight = request.items.reduce((acc, item) => {
      const weightInKg = convert(
        item.weightUnit,
        WeightUnit.KILOGRAM,
        item.weight * item.quantity,
      );

      return acc + weightInKg;
    }, 0);

    const expectedCost =
      totalWeight * mockShippingRates.rates[0]!.price * distanceAsKm;

    expect(response.data.amount).toEqual(Number(expectedCost.toFixed(2)));
  });

  test('return error when requested quantity is higher than stock', async () => {
    const { getAllWarehouseByDeviceId, getAllShippingRates } = prepareMock();

    const getShippingCost = new GetShippingCost(
      getAllWarehouseByDeviceId,
      getAllShippingRates,
    );

    const request = {
      items: [
        {
          deviceId: 1,
          quantity: 2000,
          weight: 300,
          weightUnit: WeightUnit.GRAM,
        },
      ],
      lat: 44.639722,
      lng: -70.778889,
    };

    const response = await getShippingCost.execute(request);

    expect(response).toEqual({
      data: expect.any(Object),
      statusCode: 400,
      errors: expect.any(String),
    });
  });
});

function prepareMock() {
  const mockGetAllWarehouseByDeviceId = new GetAllWarehouseByDeviceId(
    {} as unknown as Repository,
  );
  mockGetAllWarehouseByDeviceId.execute = mock(() =>
    Promise.resolve(successResult(mockWarehouses as WarehouseResponse[])),
  );

  const mockGetAllShippingRates = new GetAllShippingRate(
    {} as unknown as Repository,
  );
  mockGetAllShippingRates.execute = mock(() =>
    Promise.resolve(successResult(mockShippingRates)),
  );

  return {
    getAllWarehouseByDeviceId:
      mockGetAllWarehouseByDeviceId as GetAllWarehouseByDeviceId,
    getAllShippingRates: mockGetAllShippingRates as GetAllShippingRate,
  };
}
