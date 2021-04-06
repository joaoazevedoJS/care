import crypto from 'crypto';

import IGenerateCode from '../models/IGenerateCode';

class GenerateCodeProvider implements IGenerateCode {
  public random(lenght = 6): string {
    let code = '';

    for (let i = 0; i < lenght; i += 1) {
      code += crypto.randomInt(10).toString();
    }

    return code;
  }
}

export default GenerateCodeProvider;
