import { z } from 'zod';

export const VerifyOrderRequestSchema = z
  .object({
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
  })
  .openapi({
    description: 'Verify Order Request',
  });

export type VerifyOrderRequest = z.infer<typeof VerifyOrderRequestSchema>;
