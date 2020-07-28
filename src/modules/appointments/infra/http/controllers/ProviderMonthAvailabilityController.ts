import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

class ProviderMonthAvailabilityController {
  public async index(request: Request, respose: Response): Promise<Response> {
    const { providerId } = request.params;
    const { month, year } = request.body;

    const ListProviderMonthAvailability = container.resolve(
      ListProviderMonthAvailabilityService,
    );

    const availability = await ListProviderMonthAvailability.execute({
      providerId,
      month,
      year,
    });

    return respose.json(availability);
  }
}

export default ProviderMonthAvailabilityController;
