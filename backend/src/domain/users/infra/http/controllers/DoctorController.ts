import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ValidateEmailService from '@domain/users/services/auth/ValidateEmailService';
import ValidatePasswordService from '@domain/users/services/auth/ValidatePasswordService';
import CreateDoctorService from '@domain/users/services/CreateDoctorService';

class DoctorController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { name, email, password } = request.body;

    const validateEmail = new ValidateEmailService();
    const validatePassword = new ValidatePasswordService();

    await validateEmail.execute(email);
    await validatePassword.execute(password);

    const createUser = container.resolve(CreateDoctorService);

    const user = await createUser.execute({
      admin_id: id,
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

export default DoctorController;
