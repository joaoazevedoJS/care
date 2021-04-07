import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ValidateEmailService from '@domain/users/services/auth/ValidateEmailService';
import ValidatePasswordService from '@domain/users/services/auth/ValidatePasswordService';
import CreateUserService from '@domain/users/services/CreateUserService';

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const validateEmail = new ValidateEmailService();
    const validatePassword = new ValidatePasswordService();

    await validateEmail.execute(email);
    await validatePassword.execute(password);

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      email,
      password,
      name,
    });

    const userWithoutPasswordAndCode = {
      ...user,
      password: undefined,
      verification_code: undefined,
    };

    return response.status(201).json({ user: userWithoutPasswordAndCode });
  }
}

export default UsersController;
