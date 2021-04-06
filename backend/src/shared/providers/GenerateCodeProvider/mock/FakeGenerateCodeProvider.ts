import IGenerateCode from '../models/IGenerateCode';

class FakeGenerateCodeProvider implements IGenerateCode {
  public random(max: number): string {
    return `test${max}`;
  }
}

export default FakeGenerateCodeProvider;
