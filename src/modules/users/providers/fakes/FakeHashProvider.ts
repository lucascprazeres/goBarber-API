import IHashProvider from '../models/iHashProvider';

class FakeHashProvider implements IHashProvider {
  public async generateHashFrom(payload: string): Promise<string> {
    return payload;
  }

  public async assertEquals(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed;
  }
}

export default FakeHashProvider;
