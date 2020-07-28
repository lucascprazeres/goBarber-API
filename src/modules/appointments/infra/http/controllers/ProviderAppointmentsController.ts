import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

export default class AppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const providerId = request.user.id;
    const { day, month, year } = request.body;

    const listPrvoiderAppointments = container.resolve(
      ListProviderAppointmentsService,
    );

    const appointments = await listPrvoiderAppointments.execute({
      providerId,
      day,
      month,
      year,
    });

    return response.json(appointments);
  }
}
