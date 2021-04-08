import React, { FC } from 'react';

import { AuthProvider } from './auth';
import { ServiceProvider } from './services';
import { ToastProvider } from './toast';

const AppProvider: FC = ({ children }) => (
  <ToastProvider>
    <AuthProvider>
      <ServiceProvider>{children}</ServiceProvider>
    </AuthProvider>
  </ToastProvider>
);

export default AppProvider;
