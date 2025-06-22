import { VerifyOrderRequestSchema } from '@/dtos/order/verifyOrder.request';
import { VerifyOrder } from '@/business/order/verifyOrder';
import { resolveDependency } from '@/core/registerDependencies';
import { Router, type Request, type Response } from 'express';
import { respond } from '@/core/respond';
import { CreateOrder } from '@/business/order/createOrder';

export const orderController = (router: Router): void => {
  const orderRouter = Router();
  router.use('/orders', orderRouter);

  orderRouter.post('/', async (req: Request, res: Response) => {
    const createOrderReq = VerifyOrderRequestSchema.parse(req.body);
    const service = resolveDependency(CreateOrder) as CreateOrder;
    const result = await service.execute(createOrderReq);

    respond(res, result);
  });

  orderRouter.post('/verifications', async (req: Request, res: Response) => {
    const verifyOrderReq = VerifyOrderRequestSchema.parse(req.body);
    const service = resolveDependency(VerifyOrder) as VerifyOrder;
    const result = await service.execute(verifyOrderReq);

    respond(res, result);
  });
};
