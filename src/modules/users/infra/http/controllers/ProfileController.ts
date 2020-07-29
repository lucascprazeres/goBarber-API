import { Request, Response } from 'express';

import { container } from 'tsyringe';

import getExposableAttributesFrom from '@shared/utils/getExposableAttributesFrom';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ userId });

    const presentableUserData = getExposableAttributesFrom(user);

    return response.json(presentableUserData);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const { name, email, oldPassword, password } = request.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      userId,
      name,
      email,
      oldPassword,
      password,
    });

    const presentableUserData = getExposableAttributesFrom(user);

    return response.json(presentableUserData);
  }
}
