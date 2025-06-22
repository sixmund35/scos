import { VerifyOrderResponseSchema } from '@/dtos/order/verifyOrder.response';
import { createDocument } from 'zod-openapi';
import swaggerUi from 'swagger-ui-express';
import type { Application } from 'express';
import { VerifyOrderRequestSchema } from '@/dtos/order/verifyOrder.request';
import { CreateOrderRequestSchema } from '@/dtos/order/createOrder.request';
import { CreateOrderResponseSchema } from '@/dtos/order/createOrder.response';

const doc = createDocument({
  openapi: '3.1.0',
  info: {
    title: 'SCOS',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Local',
    },
  ],
  paths: {
    '/orders': {
      post: {
        tags: ['Orders'],
        requestBody: {
          content: {
            'application/json': { schema: CreateOrderRequestSchema },
          },
        },
        responses: {
          '200': {
            description: '200 OK',
            content: {
              'application/json': { schema: CreateOrderResponseSchema },
            },
          },
          '404': {
            description: '404 NOT FOUND',
          },
        },
      },
    },
    '/orders/verifications': {
      post: {
        tags: ['Orders'],
        requestBody: {
          content: {
            'application/json': { schema: VerifyOrderRequestSchema },
          },
        },
        responses: {
          '200': {
            description: '200 OK',
            content: {
              'application/json': { schema: VerifyOrderResponseSchema },
            },
          },
          '404': {
            description: '404 NOT FOUND',
          },
        },
      },
    },
  },
});

export const setupSwagger = (app: Application): void => {
  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(doc));
  console.log('Swagger docs available at /swagger');
};
