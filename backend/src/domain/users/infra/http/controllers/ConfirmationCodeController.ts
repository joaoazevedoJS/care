import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserConfirmationCodeService from '@domain/users/services/UpdateUserConfirmationCodeService';

class ConfirmationCodeController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { code } = request.body;
    const user_id = request.user.id;

    const confirmationCodeService = container.resolve(
      UpdateUserConfirmationCodeService,
    );

    await confirmationCodeService.execute({
      code,
      user_id,
    });

    return response.status(204).send();
  }
}

export default ConfirmationCodeController;
