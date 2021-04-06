import IMail from '@shared/dtos/smtp/IMail';

interface IMailer {
  sendMail(mail: IMail): Promise<void>;
}

export default IMailer;
