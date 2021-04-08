import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AcessAccountService from '@domain/users/services/auth/AcessAccountService';
import GetUserService from '@domain/users/services/GetUserService';

class SessionsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const getUser = container.resolve(GetUserService);

    const user = await getUser.execute(id);

    const userWithoutPasswordAndCode = {
      ...user,
      password: undefined,
      verification_code: undefined,
    };

    return response.json({ ...userWithoutPasswordAndCode });
  }

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
