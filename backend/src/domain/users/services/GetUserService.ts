import { inject, injectable } from 'tsyringe';
import IUsers from '../entities/IUsers';

import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class GetUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(user_id: string): Promise<IUsers | undefined> {
    const user = await this.usersRepository.findById(user_id);

    return user;
  }
}

export default GetUserService;
