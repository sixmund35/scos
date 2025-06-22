import type { IAsyncOperation } from '@/core/interfaces/IOperation';
import type { WarehouseResponse } from '../../dtos/warehouse/warehouse.response';
import { inject, injectable } from 'inversify';
import { Repository } from '@/core/repository';
import { successResult } from '@/core/result';
import type { IResult } from '@/core/interfaces/IResult';

@injectable('Request')
export class GetAllWarehouseByDeviceId
  implements IAsyncOperation<{ deviceId: number }, WarehouseResponse[]>
{
  constructor(@inject(Repository) private readonly repository: Repository) {}

  async execute(data: {
    deviceId: number;
  }): Promise<IResult<WarehouseResponse[]>> {
    const warehouses = await this.repository.warehouse.findMany({
      where: {
        Stock: {
          some: {
            deviceId: data.deviceId,
          },
        },
      },
      include: {
        Stock: {
          select: {
            deviceId: true,
            quantity: true,
          },
        },
      },
    });

    const result = warehouses.map(warehouse => ({
      ...warehouse,
      stock: warehouse.Stock.find(stock => ({
        deviceId: stock.deviceId,
        quantity: stock.quantity,
      }))!,
    }));

    return successResult(result);
  }
}
