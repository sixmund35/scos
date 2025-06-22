import { test, expect, mock, describe } from 'bun:test';

import { Repository } from '@/core/repository';
import { mockDiscounts } from '@/testUtils/testData/discounts';
import { CalculateDiscount } from './calculateDiscount';

describe('calculateDiscount', async () => {
  test('calculate discount correctly', async () => {
    const { repository } = prepareMock();
    const calculateDiscount = new CalculateDiscount(repository);
    const request = {
      items: [
        {
          deviceId: 1,
          quantity: 58,
          price: 100,
        },
      ],
    };

    const response = await calculateDiscount.execute(request);
    const expectedDiscount = mockDiscounts.find(x => x.minimumQuantity === 50);
    const expected =
      expectedDiscount!.amount *
      0.01 *
      request.items[0]!.price *
      request.items[0]!.quantity;

    expect(response.data).toEqual(expected);
  });

  test('no discount if quantity does not reach minimum', async () => {
    const { repository } = prepareMock();
    const calculateDiscount = new CalculateDiscount(repository);
    const request = {
      items: [
        {
          deviceId: 1,
          quantity: 2,
          price: 100,
        },
      ],
    };

    const response = await calculateDiscount.execute(request);

    expect(response.data).toEqual(0);
  });
});

function prepareMock() {
  const repository = {
    discount: {
      findMany: mock(() => Promise.resolve(mockDiscounts)),
    },
  } as unknown as Repository;

  return { repository };
}
