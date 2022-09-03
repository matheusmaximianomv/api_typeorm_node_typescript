import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

import ProfileController from '../controllers/ProfileController';

const profilesRouter = Router();

const profileController = new ProfileController();

profilesRouter.use(isAuthenticated);

profilesRouter.get('/', profileController.show);

profilesRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(3).max(255).required(),
      email: Joi.string().email().required(),
      old_password: Joi.string().min(8),
      password: Joi.string().min(8).optional(),
      password_confirmation: Joi.string()
        .valid(Joi.ref('password'))
        .when('password', { is: Joi.exist(), then: Joi.required() }),
    },
  }),
  profileController.update,
);

export default profilesRouter;
