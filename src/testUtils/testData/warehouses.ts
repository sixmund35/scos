import type { WarehouseResponse } from '@/dtos/warehouse/warehouse.response';

export const mockWarehouses: WarehouseResponse[] = [
  {
    name: 'Los Angeles',
    lat: 33.9425,
    lng: -118.408056,
    id: 1,
    stock: {
      deviceId: 1,
      quantity: 100,
    },
  },
  {
    id: 2,
    name: 'New York',
    lat: 40.639722,
    lng: -73.778889,
    stock: {
      deviceId: 1,
      quantity: 100,
    },
  },
];
