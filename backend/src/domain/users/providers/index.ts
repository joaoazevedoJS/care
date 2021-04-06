import { container } from 'tsyringe';

import JWTProvider from './TokenProviders/implementations/JWTProvider';
import ITokenProvider from './TokenProviders/models/ITokenProvider';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<ITokenProvider>('TokenProvider', JWTProvider);

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
