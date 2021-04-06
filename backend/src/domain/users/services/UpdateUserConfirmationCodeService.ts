import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  code: string;
}

@injectable()
class UpdateUserConfirmationCodeService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, code }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change code.', 401);
    }

    if (user.verified_account) {
      throw new AppError('Account already verified', 401);
    }

    if (user.verification_code !== code) {
      throw new AppError('Incorrect code', 401);
    }

    if (user.email.match(/@care.com.br/gi)) {
      ///
    }

    user.verified_account = true;

    this.usersRepository.update(user);
  }
}

export default UpdateUserConfirmationCodeService;
