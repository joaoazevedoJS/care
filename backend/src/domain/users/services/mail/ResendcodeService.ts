import { inject, injectable } from 'tsyringe';
import { getTime, isBefore } from 'date-fns';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@domain/users/repositories/IUsersRepository';
import IUsers from '@domain/users/entities/IUsers';

import IMailer from '@shared/providers/SendMailProvider/models/IMailer';
import IMailAccountCode from '@shared/entities/smtp/IMailAccountCode';
import IGenerateCode from '@shared/providers/GenerateCodeProvider/models/IGenerateCode';

@injectable()
class ResendcodeService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('GenerateCodeProvider')
    private generateCode: IGenerateCode,

    @inject('MailerProvider')
    private mailerProvider: IMailer,
  ) {}

  public async execute(user_id: string): Promise<IUsers> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User non exist', 401);
    }

    if (user.verified_account) {
      throw new AppError('Account already authenticated', 401);
    }

    const timenow = getTime(new Date());
    const dateBeforeAllowed = isBefore(timenow, user.mail_limit_date_resend);

    if (user.mail_resend_count >= 3 && dateBeforeAllowed) {
      throw new AppError('limit of email sent, try again in a few days', 401);
    }

    const code = this.generateCode.random(6);

    await this.usersRepository.updateResendcode({ user, code });

    const mailAccountCode = new IMailAccountCode({
      email: user.email,
      code: user.verification_code,
    });

    await this.mailerProvider.sendMail(mailAccountCode);

    return user;
  }
}

export default ResendcodeService;
