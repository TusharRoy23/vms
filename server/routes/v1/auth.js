import { Router } from 'express';
import loginValidator from '@validators/login';

import authController from '@controllers/v1/auth.controller';

let path = require('path');
const authRouter = new Router();

authRouter.post('/login', loginValidator, authController.login);
authRouter.post('/register', authController.register);
authRouter.post('/authLogout', authController.logout);
authRouter.get('/getUserInfo', authController.getUserInfo);
authRouter.post('/getUserDetails', authController.getUserDetails);

export default authRouter;