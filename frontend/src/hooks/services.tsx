import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import api from '../services/api';

export interface Service {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  percentage_commission: number;
}

interface ServiceContextData {
  services: Service[];
}

const ServiceContext = createContext<ServiceContextData>(
  {} as ServiceContextData,
);

const ServiceProvider: FC = ({ children }) => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    api
      .get<Service[]>('/services')
      .then(response => setServices(response.data));
  }, []);

  return (
    <ServiceContext.Provider value={{ services }}>
      {children}
    </ServiceContext.Provider>
  );
};

function useService(): ServiceContextData {
  const context = useContext(ServiceContext);

  if (!context) {
    throw new Error('useService must be used within an ServiceProvider');
  }

  return context;
}

export { ServiceProvider, useService };
