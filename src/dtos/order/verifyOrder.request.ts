import * as z from 'zod/v4';

export interface VerifyOrderRequest {
  items: { deviceId: number; quantity: number }[];
  shippingAddress: {
    lat: number;
    lng: number;
  };
}

export const VerifyOrderRequestValidation = z.object({
  items: z
    .array(
      z.object({
        deviceId: z.number().int().positive(),
        quantity: z.number().int().positive(),
      }),
    )
    .nonempty('Order must contain at least one item'),
  shippingAddress: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
});
