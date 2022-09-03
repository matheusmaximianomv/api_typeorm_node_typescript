import { Request, Response } from 'express';

import ResetPasswordEmail from '../services/ResetPasswordService';

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { token, password } = request.body;

    const sendForgotPasswordEmail = new ResetPasswordEmail();

    await sendForgotPasswordEmail.execute({ token, password });

    return response.status(204).json();
  }
}
