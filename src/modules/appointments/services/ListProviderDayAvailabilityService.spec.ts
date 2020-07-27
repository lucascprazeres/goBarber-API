import FakeAppointmentsRespository from '../repositories/fakes/FakeAppointmentsRespository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let appointmentsRespository: FakeAppointmentsRespository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailabilityService', () => {
  beforeEach(() => {
    appointmentsRespository = new FakeAppointmentsRespository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      appointmentsRespository,
    );
  });

  it('should be able to list provider month availability', async () => {
    await appointmentsRespository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    await appointmentsRespository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });

    const availability = await listProviderDayAvailability.execute({
      providerId: 'user',
      day: 20,
      month: 5,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: true },
        { hour: 10, available: false },
        { hour: 11, available: true },
      ]),
    );
  });
});
