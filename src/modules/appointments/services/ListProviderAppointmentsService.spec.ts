import FakeAppointmentsRespository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let appointmentsRespository: FakeAppointmentsRespository;
let listProviderAppointments: ListProviderAppointmentsService;

describe('ListProviderAppointmentsService', () => {
  beforeEach(() => {
    appointmentsRespository = new FakeAppointmentsRespository();
    listProviderAppointments = new ListProviderAppointmentsService(
      appointmentsRespository,
    );

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 18, 8).getTime();
    });
  });

  it('should be able to list one provider appointments', async () => {
    const appointment1 = await appointmentsRespository.create({
      provider_id: 'provider',
      user_id: '82738',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    const appointment2 = await appointmentsRespository.create({
      provider_id: 'provider',
      user_id: '82738',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    const appointments = await listProviderAppointments.execute({
      providerId: 'provider',
      day: 20,
      month: 5,
      year: 2020,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
