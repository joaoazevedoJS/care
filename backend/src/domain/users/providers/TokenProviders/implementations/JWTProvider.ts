import { sign } from 'jsonwebtoken';

import auth from '@configs/auth';

import ITokenProvider from '../models/ITokenProvider';

class JWTProvider implements ITokenProvider {
  public async sign(user_id: string): Promise<string> {
    const token = sign({}, auth.privateKey, {
      subject: user_id,
      ...auth.signOptions,
    });

    return token;
  }
}

export default JWTProvider;
