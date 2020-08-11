import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

import getExposableAttributesFrom from '@shared/utils/getExposableAttributesFrom';

export default class AppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const providerId = request.user.id;
    const { day, month, year } = request.query;

    const listPrvoiderAppointments = container.resolve(
      ListProviderAppointmentsService,
    );

    const appointments = await listPrvoiderAppointments.execute({
      providerId,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return response.json(getExposableAttributesFrom(appointments));
  }
}
