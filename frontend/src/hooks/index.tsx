import React, { FC } from 'react';

import { AuthProvider } from './auth';
import { ServiceProvider } from './services';

const AppProvider: FC = ({ children }) => (
  <AuthProvider>
    <ServiceProvider>{children}</ServiceProvider>
  </AuthProvider>
);

export default AppProvider;
