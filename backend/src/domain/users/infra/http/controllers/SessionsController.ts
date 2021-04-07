import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AcessAccountService from '@domain/users/services/auth/AcessAccountService';

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const acessAccount = container.resolve(AcessAccountService);

    const { token, user } = await acessAccount.execute({ email, password });

    const userWithoutPasswordAndCode = {
      ...user,
      password: undefined,
      verification_code: undefined,
    };

    return response
      .status(201)
      .json({ token, user: userWithoutPasswordAndCode });
  }
}

export default SessionsController;
