import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

import CustomersController from '../controllers/CustomersController';

const customersRouter = Router();
const customerController = new CustomersController();

customersRouter.use(isAuthenticated);

customersRouter.get('/', customerController.index);

customersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  customerController.show,
);

customersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(3).max(255).required(),
      email: Joi.string().min(3).max(255).required(),
    },
  }),
  customerController.create,
);

customersRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().min(3).max(255).required(),
      email: Joi.string().min(3).max(255).required(),
    },
  }),
  customerController.update,
);

customersRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  customerController.delete,
);

export default customersRouter;
