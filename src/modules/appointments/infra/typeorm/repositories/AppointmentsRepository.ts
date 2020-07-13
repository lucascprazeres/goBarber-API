import { EntityRepository, Repository } from 'typeorm';

import IAppontmentsRepository from '@modules/appointments/repositories/iAppointmentsRepository';

import Appointment from '../entities/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment>
  implements IAppontmentsRepository {
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment;
  }
}

export default AppointmentsRepository;
