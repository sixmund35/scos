import z from 'zod';

export const CreateOrderResponseSchema = z
  .object({
    subTotal: z.number().int().positive(),
    total: z.number().int().positive(),
    discount: z.number().int().nonnegative(),
    shippingCost: z.number().int().nonnegative(),
    id: z.number().int().positive().optional(),
    isValid: z.boolean().optional(),
  })
  .openapi({
    description: 'Create Order Response',
  });

export type CreateOrderResponse = z.infer<typeof CreateOrderResponseSchema>;
