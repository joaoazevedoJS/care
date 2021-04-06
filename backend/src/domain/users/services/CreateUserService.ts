import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IGenerateCode from '@shared/providers/GenerateCodeProvider/models/IGenerateCode';

import IMailer from '@shared/providers/SendMailProvider/models/IMailer';
import IMailAccountCode from '@shared/entities/smtp/IMailAccountCode';
import IUsers from '../entities/IUsers';
import IUsersRepository from '../repositories/IUsersRepository';

import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('GenerateCodeProvider')
    private generateCode: IGenerateCode,

    @inject('MailerProvider')
    private mailerProvider: IMailer,
  ) {}

  public execute = async ({
    email,
    password,
    name,
  }: Omit<ICreateUserDTO, 'verification_code'>): Promise<IUsers> => {
    const mailAlreadyExists = await this.usersRepository.findByEmail(email);

    if (mailAlreadyExists) {
      throw new AppError('E-mail already exists!');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const verification_code = this.generateCode.random(6);

    const user = await this.usersRepository.create({
      email,
      name,
      password: hashedPassword,
      verification_code,
    });

    const mailAccount = new IMailAccountCode({
      email,
      code: user.verification_code,
    });

    await this.mailerProvider.sendMail(mailAccount);

    return user;
  };
}

export default CreateUserService;
