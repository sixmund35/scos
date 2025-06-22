import { Router } from 'express';
import { orderController } from './order.controller';

export function controllers(): Router {
  const router = Router();

  // Register all controllers here
  orderController(router);

  return router;
}
