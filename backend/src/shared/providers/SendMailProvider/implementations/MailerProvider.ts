import path from 'path';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import hbs from 'nodemailer-express-handlebars';

import mailConfig from '@configs/mail';

import IMailer from '@shared/providers/SendMailProvider/models/IMailer';
import IMail from '@shared/dtos/smtp/IMail';

export interface IMailerhandlebarsOptions {
  viewEngine: {
    partialsDir: string;
    defaultLayout: undefined | string;
  };
  viewPath: string;
  extName: string;
}

class MailerProvider implements IMailer {
  private transport = nodemailer.createTransport(mailConfig);

  private mailsPath = path.resolve(__dirname, 'mails');

  private handleBars = () => {
    const handlebars: IMailerhandlebarsOptions = {
      viewEngine: { partialsDir: this.mailsPath, defaultLayout: undefined },
      viewPath: this.mailsPath,
      extName: '.html',
    };

    return handlebars;
  };

  private useTransport = (): Mail => {
    return this.transport.use('compile', hbs(this.handleBars()));
  };

  public async sendMail(mail: IMail): Promise<void> {
    await this.useTransport().sendMail(mail);
  }
}

export default MailerProvider;
