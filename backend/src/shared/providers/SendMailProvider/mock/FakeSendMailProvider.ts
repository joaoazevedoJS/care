import IMail from '@shared/dtos/smtp/IMail';
import IMailer from '../models/IMailer';

class FakeSendMailProvider implements IMailer {
  public async sendMail(mail: IMail): Promise<void> {
    // eslint-disable-next-line no-console
    console.log(mail);
  }
}

export default FakeSendMailProvider;
