import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';

import SessionsController from '../controllers/SessionsController';

const sessionRouter = Router();
const sessionsController = new SessionsController();

const loginDataValidationSchema = {
  [Segments.BODY]: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
};

sessionRouter.post(
  '/',
  celebrate(loginDataValidationSchema),
  sessionsController.create,
);

export default sessionRouter;
