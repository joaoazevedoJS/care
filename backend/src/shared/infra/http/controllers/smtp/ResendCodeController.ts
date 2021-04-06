import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResendcodeService from '@domain/users/services/mail/ResendcodeService';

class ResendCodeController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const resendcode = container.resolve(ResendcodeService);

    await resendcode.execute(id);

    return response.status(201).json({ message: 'Resend code to mail' });
  }
}

export default ResendCodeController;
