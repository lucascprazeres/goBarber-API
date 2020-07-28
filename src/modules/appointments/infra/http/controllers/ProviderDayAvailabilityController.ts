import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

class ProviderDayAvailabilityController {
  public async index(request: Request, respose: Response): Promise<Response> {
    const { providerId } = request.params;
    const { day, month, year } = request.body;

    const ListProviderDayAvailability = container.resolve(
      ListProviderDayAvailabilityService,
    );

    const providers = await ListProviderDayAvailability.execute({
      providerId,
      day,
      month,
      year,
    });

    return respose.json(providers);
  }
}

export default ProviderDayAvailabilityController;
