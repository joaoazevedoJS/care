import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import ValidatePasswordService from '@domain/users/services/auth/ValidatePasswordService';

describe('Validate mail', () => {
  it('should be able validate password valid', async () => {
    const validatePassword = new ValidatePasswordService();

    const isValid = await validatePassword.execute('@Test12345');

    expect(isValid).toBe(true);
  });

  it('should be able return exception to password non contain UpperCase', async () => {
    const validatePassword = new ValidatePasswordService();

    await expect(validatePassword.execute('@test12345')).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should be able return exception to password non contain Special char', async () => {
    const validatePassword = new ValidatePasswordService();

    await expect(validatePassword.execute('Test12345')).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should be able return exception to password non Must longer', async () => {
    const validatePassword = new ValidatePasswordService();

    await expect(validatePassword.execute('@Te')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
