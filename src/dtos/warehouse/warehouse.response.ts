export interface WarehouseResponse {
  id: number;
  name: string;
  lat: number;
  lng: number;
  stock: {
    deviceId: number;
    quantity: number;
  };
}
