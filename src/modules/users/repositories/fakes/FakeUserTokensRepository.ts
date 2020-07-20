import { uuid } from 'uuidv4';

import IUserTokensRepository from '../iUserTokensRepository';

import UserToken from '../../infra/typeorm/entities/UserToken';

class UserTokensRepository implements IUserTokensRepository {
  private userTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
      created_at: Date.now(),
      updated_at: Date.now(),
    });

    this.userTokens.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find(
      currentUserToken => currentUserToken.token === token,
    );

    return userToken;
  }
}

export default UserTokensRepository;
