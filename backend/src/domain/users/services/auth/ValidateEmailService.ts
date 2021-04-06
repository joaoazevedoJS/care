import AppError from '@shared/errors/AppError';

class ValidateEmailService {
  public async execute(email: string): Promise<boolean> {
    const isValid = email.match(/\S+@\w+\.\w{2,6}(\.\w{2})?/g);

    if (!isValid) {
      throw new AppError('E-mail is not valid!');
    }

    return true;
  }
}

export default ValidateEmailService;
