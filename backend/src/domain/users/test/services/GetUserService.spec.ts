import 'reflect-metadata';

import FakeUsersRepository from '@domain/users/mock/FakeUsersRepository';
import GetUserService from '@domain/users/services/GetUserService';

describe('Get User', () => {
  it('should be able find user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();

    const getUser = new GetUserService(fakeUsersRepository);

    const user = await fakeUsersRepository.create({
      email: 'test@gmail.com',
      name: 'doctor',
      password: '@A4321test',
      user_type_id: '1',
      verification_code: '111111',
    });

    const response = await getUser.execute(user.id);

    expect(response).toHaveProperty('id');
  });

  it('should be able find user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();

    const getUser = new GetUserService(fakeUsersRepository);

    const response = await getUser.execute('id');

    expect(response).toBe(undefined);
  });
});
