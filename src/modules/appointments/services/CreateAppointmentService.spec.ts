import FakeAppointmentsRespository from '../repositories/fakes/FakeAppointmentsRespository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointmentService', () => {
  it('should be able to create a new appointment', async () => {
    const appointmentsRepository = new FakeAppointmentsRespository();
    const createAppointment = new CreateAppointmentService(
      appointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');
  });

  // it('should not be able to create two appointments at the same time', () => {
  //   expect(1 + 2).toBe(3);
  // });
});
