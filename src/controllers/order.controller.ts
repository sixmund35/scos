import { VerifyOrderRequestValidation } from '@/dtos/order/verifyOrder.request';
import { VerifyOrder } from '@/business/order/verifyOrder';
import { resolveDependency } from '@/core/registerDependencies';
import { Router, type Request, type Response } from 'express';

export const orderController = (router: Router): void => {
  const orderRouter = Router();
  router.use('/orders', orderRouter);

  orderRouter.post('/verifications', async (req: Request, res: Response) => {
    const verifyOrderReq = VerifyOrderRequestValidation.parse(req.body);
    const service = resolveDependency(VerifyOrder) as VerifyOrder;
    const result = await service.execute(verifyOrderReq);

    // TODO: use error handling middleware instead
    if (result.statusCode !== 200) {
      res.status(result.statusCode).json({
        errors: result.errors,
      });
    }

    res.status(result.statusCode).json(result.data);
  });
};
