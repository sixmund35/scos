import type { Application } from 'express';
import cors from 'cors';
import express from 'express';
import { controllers } from '../controllers/main.controller';
import { registerDependencies } from './registerDependencies';
import { errorHandler } from './middlewares/errorHandler';

export async function loader(app: Application): Promise<void> {
  await registerDependencies();

  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use('/api', controllers());
  app.use(errorHandler);
}
