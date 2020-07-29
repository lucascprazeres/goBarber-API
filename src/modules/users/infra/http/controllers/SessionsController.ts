import { Request, Response } from 'express';

import { container } from 'tsyringe';

import getExposableAttributesFrom from '@shared/utils/getExposableAttributesFrom';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({ email, password });

    const presentableUserData = getExposableAttributesFrom(user);

    return response.json({ user: presentableUserData, token });
  }
}
