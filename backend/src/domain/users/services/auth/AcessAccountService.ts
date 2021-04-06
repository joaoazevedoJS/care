import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@domain/users/repositories/IUsersRepository';
import IUsers from '@domain/users/entities/IUsers';
import ITokenProvider from '@domain/users/providers/TokenProviders/models/ITokenProvider';
import IHashProvider from '@domain/users/providers/HashProvider/models/IHashProvider';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: IUsers;
  token: string;
}

@injectable()
class AcessAccountService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public execute = async ({
    email,
    password,
  }: IRequest): Promise<IResponse> => {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordIsEquals = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordIsEquals) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const token = await this.tokenProvider.sign(user.id);

    return { user, token };
  };
}

export default AcessAccountService;
