import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useState,
} from 'react';

import api from '../services/api';
import { useToast } from './toast';

export interface User {
  id: string;
  email: string;
  name: string;
  user_avatar: string;
  verified_account: boolean;
  mail_resend_count: number;
  mail_limit_date_resend: Date;
  user_type: {
    id: string;
    type: 'admin' | 'doctor' | 'user';
  };
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface SignUpData extends SignInCredentials {
  name: string;
  isDoctor?: boolean;
}

interface AuthContextData {
  token: string;
  getUser(): Promise<User | undefined>;
  signIn(credentials: SignInCredentials): Promise<void>;
  signUp(data: SignUpData): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: FC = ({ children }) => {
  const { addToast } = useToast();

  const [UserToken, setUserToken] = useState<string>(() => {
    const token = localStorage.getItem('@Care:token');

    if (token) {
      return token;
    }

    return '';
  });

  const signIn = useCallback(
    async ({ email, password }) => {
      try {
        const response = await api.post('/sessions/signin', {
          email,
          password,
        });

        const { token } = response.data;

        localStorage.setItem('@Care:token', token);

        setUserToken(token);
      } catch (e) {
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais',
        });
      }
    },
    [addToast],
  );

  const signUp = useCallback(
    async ({ email, password, name, isDoctor }) => {
      try {
        const route = isDoctor ? '/admin/doctor/signup' : '/users/signup';

        await api.post(route, {
          email,
          password,
          name,
        });
      } catch (error) {
        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao realizar cadastro, tente novamente!',
        });
      }
    },
    [addToast],
  );

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
      value={{ token: UserToken, getUser, signIn, signUp, signOut }}
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
