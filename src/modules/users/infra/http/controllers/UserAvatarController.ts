import { Request, Response } from 'express';

import { container } from 'tsyringe';

import getExposableAttributesFrom from '@shared/utils/getExposableAttributesFrom';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    const presentableUserData = getExposableAttributesFrom(user);

    return response.json(presentableUserData);
  }
}
