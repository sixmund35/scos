/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, mock, test } from 'bun:test';
import { GetShippingCost } from '../shipping/getShippingCost';
import { successResult } from '@/core/result';
import { CalculateDiscount } from './calculateDiscount';
import type { Repository } from '@/core/repository';
import { mockDevices } from '@/testUtils/testData/devices';
import { VerifyOrder } from './verifyOrder';
import type { IResult } from '@/core/interfaces/IResult';
import type { VerifyOrderResponse } from '@/dtos/order/verifyOrder.response';

describe('verifyOrder', () => {
  test('order is valid when the shipping cost is not more than 15% of the total price', async () => {
    const { getShippingCost, calculateDiscount, repository } = prepareMock({
      shippingCost: 100,
      discount: 10,
    });

    const verifyOrder = new VerifyOrder(
      getShippingCost,
      repository,
      calculateDiscount,
    );

    const response = await verifyOrder.execute({
      items: [
        {
          deviceId: 1,
          quantity: 20,
        },
      ],
      shippingAddress: {
        lat: 0,
        lng: 0,
      },
    });

    expect((response as IResult<VerifyOrderResponse>).data).toEqual({
      total: 2090,
      shippingCost: 100,
      discount: 10,
      isValid: true,
      subTotal: 2000,
    });
  });

  test('order is invalid when the shipping cost is more than 15% of the total price', async () => {
    const { getShippingCost, calculateDiscount, repository } = prepareMock({
      shippingCost: 350,
      discount: 10,
    });

    const verifyOrder = new VerifyOrder(
      getShippingCost,
      repository,
      calculateDiscount,
    );

    const response = await verifyOrder.execute({
      items: [
        {
          deviceId: 1,
          quantity: 20,
        },
      ],
      shippingAddress: {
        lat: 0,
        lng: 0,
      },
    });

    expect((response as IResult<VerifyOrderResponse>).data).toEqual({
      total: 2340,
      shippingCost: 350,
      discount: 10,
      isValid: false,
      subTotal: 2000,
    });
  });
});

function prepareMock(props: { shippingCost?: number; discount?: number } = {}) {
  const getShippingCost = new GetShippingCost({} as any, {} as any);
  getShippingCost.execute = mock(() =>
    Promise.resolve(successResult({ amount: props.shippingCost ?? 100 })),
  );

  const repository = {
    device: {
      findMany: mock(() => Promise.resolve(mockDevices)),
    },
  } as unknown as Repository;

  const calculateDiscount = new CalculateDiscount({} as any);
  calculateDiscount.execute = mock(() =>
    Promise.resolve(successResult(props.discount ?? 10)),
  );

  return { getShippingCost, calculateDiscount, repository };
}
