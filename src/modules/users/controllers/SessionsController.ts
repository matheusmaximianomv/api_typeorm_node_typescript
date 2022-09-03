import { Request, Response } from 'express';

import CreateSessionService from '../services/CreateSessionsService';

export default class Sessionontroller {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const createUserService = new CreateSessionService();

    const session = await createUserService.execute({ email, password });

    return response.status(201).json({ session });
  }
}
