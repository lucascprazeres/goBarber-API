import FakeUsersRespository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from './ListProvidersService';

let usersRepository: FakeUsersRespository;
let listProviders: ListProvidersService;
let cacheProvider: FakeCacheProvider;

describe('ListProvidersService', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRespository();
    cacheProvider = new FakeCacheProvider();
    listProviders = new ListProvidersService(usersRepository, cacheProvider);
  });

  it('should be able to list all providers excluding current user', async () => {
    const provider1 = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    const provider2 = await usersRepository.create({
      name: 'John Tre',
      email: 'johndtre@email.com',
      password: '123456',
    });

    const LoggedUser = await usersRepository.create({
      name: 'John Qua',
      email: 'johnqua@email.com',
      password: '123456',
    });

    const providers = await listProviders.execute({
      userId: LoggedUser.id,
    });

    expect(providers).toEqual([provider1, provider2]);
  });
});
