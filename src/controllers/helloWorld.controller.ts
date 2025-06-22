import { Router, type Request, type Response } from 'express';
import { resolveDependency } from '../core/registerDependencies';
import { GetHelloWorld } from '../business/helloWorld/getHelloWorld';
import { ThrowException } from '../business/helloWorld/throwException';
import { respond } from '@/core/respond';

export const helloWorldController = (router: Router): void => {
  const helloWorldRouter = Router();
  router.use('/hello-world', helloWorldRouter);

  helloWorldRouter.get('/', async (req: Request, res: Response) => {
    const service = resolveDependency(GetHelloWorld) as GetHelloWorld;
    const result = await service.execute();

    respond(res, result);
  });

  helloWorldRouter.get('/again', (req: Request, res: Response) => {
    const service = resolveDependency(ThrowException) as ThrowException;
    const result = service.execute();

    respond(res, result);
  });
};
