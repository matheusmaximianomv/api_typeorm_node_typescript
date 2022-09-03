import { Request, Response } from 'express';

import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { filename: avatarFileName } = request.file as Express.Multer.File;

    const updateAvatarService = new UpdateUserAvatarService();

    const user = updateAvatarService.execute({
      user_id,
      avatarFileName,
    });

    return response.status(200).json(user);
  }
}
