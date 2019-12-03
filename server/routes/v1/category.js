import { Router } from 'express';

import categoryController from '@controllers/v1/category.controller';
import categoryValidator from '@validators/category';


const categoryRouter = new Router();

categoryRouter.post('/updateCategory', categoryController.updateCategory);
categoryRouter.post('/createCategory', categoryValidator, categoryController.createCategory);
categoryRouter.get('/getCategoryList', categoryController.getCategoryList);
categoryRouter.post('/deleteCategory', categoryController.deleteCategory);
categoryRouter.post('/updateStatus', categoryController.updateStatus);

export default categoryRouter;