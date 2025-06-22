import { DiscountType } from '@/enums/discountType';
import { PrismaClient } from '../src/prisma/client';
import { Currency } from '@/enums/currency';
import { ShippingRateType } from '@/enums/shippingRateType';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      firstName: 'John',
      middleName: 'Robert',
      lastName: 'Doe',
      age: 30,
    },
  });

  const device1 = await prisma.device.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'SCOS Station P1 Pro',
      weight: 365,
      weightUnit: 1,
      price: 150,
      currency: Currency.USD,
    },
  });

  const la = await prisma.warehouse.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Los Angeles',
      lat: 33.9425,
      lng: -118.408056,
    },
  });

  const ny = await prisma.warehouse.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'New York',
      lat: 40.639722,
      lng: -73.778889,
    },
  });
  const saoPaolo = await prisma.warehouse.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: 'São Paulo',
      lat: -23.435556,
      lng: -46.473056,
    },
  });
  const paris = await prisma.warehouse.upsert({
    where: { id: 4 },
    update: {},
    create: {
      name: 'Paris',
      lat: 49.009722,
      lng: 2.547778,
    },
  });
  const warsaw = await prisma.warehouse.upsert({
    where: { id: 5 },
    update: {},
    create: {
      name: 'Warsaw',
      lat: 52.165833,
      lng: 20.967222,
    },
  });
  const hk = await prisma.warehouse.upsert({
    where: { id: 6 },
    update: {},
    create: {
      name: 'Hong Kong',
      lat: 22.308889,
      lng: 113.914444,
    },
  });

  await prisma.stock.upsert({
    where: {
      deviceId_warehouseId: {
        deviceId: device1.id,
        warehouseId: la.id,
      },
    },
    update: {},
    create: {
      deviceId: device1.id,
      warehouseId: la.id,
      quantity: 355,
    },
  });

  await prisma.discount.upsert({
    where: { id: 1 },
    update: {},
    create: {
      deviceId: device1.id,
      minimumQuantity: 25,
      type: DiscountType.PERCENTAGE,
      amount: 5,
    },
  });

  await prisma.discount.upsert({
    where: { id: 2 },
    update: {},
    create: {
      deviceId: device1.id,
      minimumQuantity: 50,
      type: DiscountType.PERCENTAGE,
      amount: 10,
    },
  });

  await prisma.discount.upsert({
    where: { id: 3 },
    update: {},
    create: {
      deviceId: device1.id,
      minimumQuantity: 100,
      type: DiscountType.PERCENTAGE,
      amount: 15,
    },
  });

  await prisma.discount.upsert({
    where: { id: 4 },
    update: {},
    create: {
      deviceId: device1.id,
      minimumQuantity: 250,
      type: DiscountType.PERCENTAGE,
      amount: 20,
    },
  });

  await prisma.shippingRate.upsert({
    where: { id: 1 },
    update: {},
    create: {
      price: 0.01,
      currency: 1,
      type: ShippingRateType.COST_PER_KG_PER_KM,
    },
  });

  await prisma.stock.upsert({
    where: {
      deviceId_warehouseId: {
        deviceId: device1.id,
        warehouseId: la.id,
      },
    },
    update: {},
    create: {
      quantity: 355,
      deviceId: device1.id,
      warehouseId: la.id,
    },
  });

  await prisma.stock.upsert({
    where: {
      deviceId_warehouseId: {
        deviceId: device1.id,
        warehouseId: ny.id,
      },
    },
    update: {},
    create: {
      quantity: 578,
      deviceId: device1.id,
      warehouseId: ny.id,
    },
  });

  await prisma.stock.upsert({
    where: {
      deviceId_warehouseId: {
        deviceId: device1.id,
        warehouseId: saoPaolo.id,
      },
    },
    update: {},
    create: {
      quantity: 265,
      deviceId: device1.id,
      warehouseId: saoPaolo.id,
    },
  });
  await prisma.stock.upsert({
    where: {
      deviceId_warehouseId: {
        deviceId: device1.id,
        warehouseId: paris.id,
      },
    },
    update: {},
    create: {
      quantity: 694,
      deviceId: device1.id,
      warehouseId: paris.id,
    },
  });
  await prisma.stock.upsert({
    where: {
      deviceId_warehouseId: {
        deviceId: device1.id,
        warehouseId: warsaw.id,
      },
    },
    update: {},
    create: {
      quantity: 245,
      deviceId: device1.id,
      warehouseId: warsaw.id,
    },
  });
  await prisma.stock.upsert({
    where: {
      deviceId_warehouseId: {
        deviceId: device1.id,
        warehouseId: hk.id,
      },
    },
    update: {},
    create: {
      quantity: 419,
      deviceId: device1.id,
      warehouseId: hk.id,
    },
  });

  console.log('Database has been seeded!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
