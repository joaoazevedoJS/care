import AppError from '@shared/errors/AppError';

class ValidatePasswordService {
  public async execute(password: string): Promise<boolean> {
    const containUpperCase = password.match(/(?=.*[A-Z])/g);
    const containSpecialChar = password.match(/(?=.*[@#$%!^&*])/g);
    const passwordMustLonger = password.match(/.{8,}$/g);

    if (!containUpperCase) {
      throw new AppError('Password must contain a capital letter!', 401);
    }

    if (!containSpecialChar) {
      throw new AppError('Password must contain a special characters!', 401);
    }

    if (!passwordMustLonger) {
      throw new AppError('Password must be longer than 8 characters!', 401);
    }

    return true;
  }
}

export default ValidatePasswordService;
