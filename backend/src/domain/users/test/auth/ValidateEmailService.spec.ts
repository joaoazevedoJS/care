import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import ValidateEmailService from '@domain/users/services/auth/ValidateEmailService';

describe('Validate mail', () => {
  it('should be able validate one mail valid', async () => {
    const validateEmail = new ValidateEmailService();

    const isValid = await validateEmail.execute('test@gmail.com');

    expect(isValid).toBe(true);
  });

  it('should be able return exception to one mail not valid', async () => {
    const validateEmail = new ValidateEmailService();

    await expect(validateEmail.execute('test@a.a')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
