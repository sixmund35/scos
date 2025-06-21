import { Router, type Request, type Response } from 'express';

export const testController = (router: Router): void => {
  const testRouter = Router();
  router.use('/test', testRouter);

  testRouter.get('/', (req: Request, res: Response) => {
    res.status(200).json({
      message: 'teststest!',
    });
  });
};
