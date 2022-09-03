import { Request, Response } from 'express';

import SendForgotPasswordEmail from '../services/SendForgotPasswordEmailService';

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordEmail = new SendForgotPasswordEmail();

    await sendForgotPasswordEmail.execute({ email });

    return response.status(204).json();
  }
}
