import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';

const providersRouter = Router();
const providersController = new ProvidersController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();

const providerIdValidationSchema = {
  [Segments.PARAMS]: {
    providerId: Joi.string().uuid().required(),
  },
};

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);

providersRouter.get(
  '/:providerId/month-availability',
  celebrate(providerIdValidationSchema),
  providerMonthAvailabilityController.index,
);
providersRouter.get(
  '/:providerId/day-availability',
  celebrate(providerIdValidationSchema),
  providerDayAvailabilityController.index,
);

export default providersRouter;
