import { hash, compare } from 'bcryptjs';
import IHashProvider from '../models/iHashProvider';

class BCryptHashProvider implements IHashProvider {
  public async generateHashFrom(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  public async assertEquals(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}

export default BCryptHashProvider;
