import { z } from 'zod';

export const VerifyOrderResponseSchema = z
  .object({
    subTotal: z.number().int().positive(),
    total: z.number().int().positive(),
    discount: z.number().int().nonnegative(),
    shippingCost: z.number().int().nonnegative(),
    isValid: z.boolean(),
  })
  .openapi({ description: 'Verify Order Response' });

export type VerifyOrderResponse = z.infer<typeof VerifyOrderResponseSchema>;
