import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';
import AppointmentsRepository from '../infra/typeorm/repositories/AppointmentsRepository';

interface Request {
  provider_id: string;
  date: Date;
}

export default class CreateAppointmentService {
  public async execute({ provider_id, date }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}
