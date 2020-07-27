import { injectable, inject } from 'tsyringe';
import { getHours } from 'date-fns';

import IAppointmentsRepository from '../repositories/iAppointmentsRepository';

// import User from '@/users/infra/typeorm/entities/User';

interface IRequest {
  providerId: string;
  day: number;
  month: number;
  year: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProvidersDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsrepository: IAppointmentsRepository,
  ) {}

  public async execute({
    providerId,
    day,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsrepository.findAllInDayFromProvider(
      {
        providerId,
        day,
        month,
        year,
      },
    );

    const startHour = 8;

    const workHoursInDayArray = Array.from(
      { length: 10 },
      (_, index) => index + startHour,
    );

    const availability = workHoursInDayArray.map(hour => {
      const hasAppointmentInHour = appointments.find(appointment => {
        return getHours(appointment.date) === hour;
      });

      return {
        hour,
        available: !hasAppointmentInHour,
      };
    });

    return availability;
  }
}

export default ListProvidersDayAvailabilityService;
