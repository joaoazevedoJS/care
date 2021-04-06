import { v4 as uuid } from 'uuid';
import { addDays, getTime, isAfter } from 'date-fns';

import IUsersRepository from '@domain/users/repositories/IUsersRepository';
import IUser from '@domain/users/entities/IUsers';

import ICreateUserDTO from '@domain/users/dtos/ICreateUserDTO';
import IUpdateResendCodeDTO from '../dtos/IUpdateResendCodeDTO';

class FakeUsersRepository implements IUsersRepository {
  private users: IUser[] = [];

  public async findById(id: string): Promise<IUser | undefined> {
    const findUser = this.users.find(user => user.id === id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<IUser | undefined> {
    const findUser = this.users.find(user => user.email === email);

    return findUser;
  }

  public async create({
    email,
    password,
    name,
    verification_code,
  }: ICreateUserDTO): Promise<IUser> {
    const user: IUser = {
      id: uuid(),
      email,
      name,
      password,
      user_avatar: '',
      verified_account: false,
      verification_code,
      mail_limit_date_resend: new Date(),
      mail_resend_count: 0,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.users.push(user);

    return user;
  }

  public async update(user: IUser): Promise<void> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    if (findIndex >= 0) {
      this.users[findIndex] = user;
    } else {
      this.users.push(user);
    }
  }

  public async updateResendcode({
    user,
    code,
  }: IUpdateResendCodeDTO): Promise<void> {
    const timenow = getTime(new Date());

    const dateAfterAllowed = isAfter(timenow, user.mail_limit_date_resend);

    if (user.mail_resend_count >= 3 && dateAfterAllowed) {
      user.mail_resend_count = 0;
    }

    user.mail_resend_count += 1;
    user.verification_code = code;

    if (user.mail_resend_count >= 3) {
      user.mail_limit_date_resend = addDays(timenow, 1);
    }

    await this.update(user);
  }
}

export default FakeUsersRepository;
