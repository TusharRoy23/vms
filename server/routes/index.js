import { Router } from 'express';
import authRouter from './v1/auth';
import profileRouter from './v1/profile';

const v1Router = new Router();
v1Router.use('/api/v1/auth', authRouter);
v1Router.use('/api/v1/profile', profileRouter);

export default v1Router;