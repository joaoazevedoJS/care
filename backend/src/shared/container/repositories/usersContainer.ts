import { container } from 'tsyringe';

import IUsersRepository from '@domain/users/repositories/IUsersRepository';
import UsersRepository from '@domain/users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
