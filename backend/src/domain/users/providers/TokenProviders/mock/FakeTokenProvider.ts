import ITokenProvider from '../models/ITokenProvider';

class FakeTokenProvider implements ITokenProvider {
  public async sign(user_id: string): Promise<string> {
    return 'token';
  }
}

export default FakeTokenProvider;
