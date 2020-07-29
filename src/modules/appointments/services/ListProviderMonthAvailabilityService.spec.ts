import FakeAppointmentsRespository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let appointmentsRespository: FakeAppointmentsRespository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailabilityService', () => {
  beforeEach(() => {
    appointmentsRespository = new FakeAppointmentsRespository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      appointmentsRespository,
    );
  });

  it('should be able to list provider month availability', async () => {
    await appointmentsRespository.create({
      provider_id: 'user',
      user_id: '82738',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    await appointmentsRespository.create({
      provider_id: 'user',
      user_id: '82738',
      date: new Date(2020, 4, 20, 9, 0, 0),
    });

    await appointmentsRespository.create({
      provider_id: 'user',
      user_id: '82738',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });

    await appointmentsRespository.create({
      provider_id: 'user',
      user_id: '82738',
      date: new Date(2020, 4, 20, 11, 0, 0),
    });

    await appointmentsRespository.create({
      provider_id: 'user',
      user_id: '82738',
      date: new Date(2020, 4, 20, 12, 0, 0),
    });

    await appointmentsRespository.create({
      provider_id: 'user',
      user_id: '82738',
      date: new Date(2020, 4, 20, 13, 0, 0),
    });

    await appointmentsRespository.create({
      provider_id: 'user',
      user_id: '82738',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    await appointmentsRespository.create({
      provider_id: 'user',
      user_id: '82738',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    await appointmentsRespository.create({
      provider_id: 'user',
      user_id: '82738',
      date: new Date(2020, 4, 20, 16, 0, 0),
    });

    await appointmentsRespository.create({
      provider_id: 'user',
      user_id: '82738',
      date: new Date(2020, 4, 20, 17, 0, 0),
    });

    await appointmentsRespository.create({
      provider_id: 'user',
      user_id: '82738',
      date: new Date(2020, 4, 21, 8, 0, 0),
    });

    const availability = await listProviderMonthAvailability.execute({
      providerId: 'user',
      year: 2020,
      month: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true },
      ]),
    );
  });
});
