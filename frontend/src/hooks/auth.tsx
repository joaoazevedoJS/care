import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useState,
} from 'react';

import api from '../services/api';

export interface User {
  id: string;
  email: string;
  name: string;
  user_avatar: string;
  user_type_id: string;
  verified_account: boolean;
  mail_resend_count: number;
  mail_limit_date_resend: Date;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  token: string;
  getUser(): Promise<User | undefined>;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: FC = ({ children }) => {
  const [UserToken, setUserToken] = useState<string>(() => {
    const token = localStorage.getItem('@Care:token');

    if (token) {
      return token;
    }

    return '';
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions/signin', {
      email,
      password,
    });

    const { token } = response.data;

    localStorage.setItem('@Care:token', token);

    setUserToken(token);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Care:token');

    setUserToken('');
  }, []);

  const getUser = useCallback(async () => {
    try {
      const response = await api.get<User | undefined>('/sessions/user');

      if (!response || !response.data) {
        throw new Error('user not found');
      }

      return response.data;
    } catch (error) {
      setUserToken('');

      return undefined;
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ token: UserToken, getUser, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
