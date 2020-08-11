import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate, isAfter, endOfDay } from 'date-fns';

import IAppointmentsRepository from '../repositories/iAppointmentsRepository';

interface IRequest {
  providerId: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProvidersMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsrepository: IAppointmentsRepository,
  ) {}

  public async execute({
    providerId,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsrepository.findAllInMonthFromProvider(
      {
        providerId,
        year,
        month,
      },
    );

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    const daysInMonthArray = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1,
    );

    const availability = daysInMonthArray.map(day => {
      const searchedDaysEnd = endOfDay(new Date(year, month - 1, day));

      const appointmentsInCurrentDay = appointments.filter(appointment => {
        return getDate(appointment.date) === day;
      });

      return {
        day,
        available:
          isAfter(searchedDaysEnd, new Date()) &&
          appointmentsInCurrentDay.length < 10,
      };
    });

    return availability;
  }
}

export default ListProvidersMonthAvailabilityService;
