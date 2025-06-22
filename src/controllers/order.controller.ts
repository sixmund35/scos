import { VerifyOrderRequestValidation } from '@/dtos/order/verifyOrder.request';
import { VerifyOrder } from '@/business/order/verifyOrder';
import { resolveDependency } from '@/core/registerDependencies';
import { Router, type Request, type Response } from 'express';
import { respond } from '@/core/respond';

export const orderController = (router: Router): void => {
  const orderRouter = Router();
  router.use('/orders', orderRouter);

  orderRouter.post('/verifications', async (req: Request, res: Response) => {
    const verifyOrderReq = VerifyOrderRequestValidation.parse(req.body);
    const service = resolveDependency(VerifyOrder) as VerifyOrder;
    const result = await service.execute(verifyOrderReq);

    respond(res, result);
  });
};
