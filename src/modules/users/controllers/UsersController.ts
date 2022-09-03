import { Request, Response } from 'express';

import ListUserService from '../services/ListUserService';
import CreateUserService from '../services/CreateUserService';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUserService = new ListUserService();

    const users = await listUserService.execute();

    return response.status(200).json(users);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createUserService = new CreateUserService();

    const user = await createUserService.execute({ name, email, password });

    return response.status(201).json({ user });
  }
}
