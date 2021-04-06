import { container } from 'tsyringe';

import IUsersRepository from '@domain/users/repositories/IUsersRepository';
import UsersRepository from '@domain/users/infra/typeorm/repositories/UsersRepository';

import IUsersTypeRepository from '@domain/users/repositories/IUsersTypeRepository';
import UsersTypeRepository from '@domain/users/infra/typeorm/repositories/UsersTypeRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUsersTypeRepository>(
  'UsersTypeRepository',
  UsersTypeRepository,
);
