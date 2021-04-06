import { getRepository, Repository } from 'typeorm';
import { addDays, getTime, isAfter } from 'date-fns';

import IUsersRepository from '@domain/users/repositories/IUsersRepository';
import IUsers from '@domain/users/entities/IUsers';

import IUpdateResendCodeDTO from '@domain/users/dtos/IUpdateResendCodeDTO';
import ICreateUserDTO from '@domain/users/dtos/ICreateUserDTO';

import Users from '../entities/Users';

class UsersRepository implements IUsersRepository {
  private repository: Repository<IUsers>;

  constructor() {
    this.repository = getRepository(Users);
  }

  public async findById(id: string): Promise<IUsers | undefined> {
    const user = this.repository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<IUsers | undefined> {
    const user = this.repository.findOne({ where: { email } });

    return user;
  }

  public async create({
    email,
    password,
    name,
    verification_code,
  }: ICreateUserDTO): Promise<IUsers> {
    const user = this.repository.create({
      email,
      password,
      name,
      verification_code,
    });

    await this.repository.save(user);

    return user;
  }

  public async update(user: IUsers): Promise<void> {
    await this.repository.save(user);
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

    await this.repository.save(user);
  }
}

export default UsersRepository;
