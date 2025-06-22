import { Router } from 'express';
import { helloWorldController } from './helloWorld.controller';
import { orderController } from './order.controller';

export function controllers(): Router {
  const router = Router();

  helloWorldController(router);
  orderController(router);

  return router;
}
