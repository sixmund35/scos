import { Router } from 'express';
import { helloWorldController } from './helloWorld.controller';
import { testController } from './test.controller';

export function controllers(): Router {
  const router = Router();

  helloWorldController(router);
  testController(router);

  return router;
}
