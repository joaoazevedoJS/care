import { container } from 'tsyringe';

import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';
import IStorageProvider from './StorageProvider/models/IStorageProvider';

import MailerProvider from './SendMailProvider/implementations/MailerProvider';
import IMailer from './SendMailProvider/models/IMailer';

import GenerateCodeProvider from './GenerateCodeProvider/implementations/GenerateCodeProvider';
import IGenerateCode from './GenerateCodeProvider/models/IGenerateCode';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<IMailer>('MailerProvider', MailerProvider);

container.registerSingleton<IGenerateCode>(
  'GenerateCodeProvider',
  GenerateCodeProvider,
);
