import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import api from '../services/api';

import { User } from './auth';

export interface Service {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  percentage_commission: number;
}

export interface Appointment {
  id: string;
  date: Date;
  time_minutes: 40;
  doctor: User;
}

interface ServiceContextData {
  services: Service[];
  getAppointments(service_id: string): Promise<Appointment[]>;
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

  const getAppointments = useCallback(async (service_id: string) => {
    const response = await api.get<Appointment[]>(`/appointment/${service_id}`);

    return response.data;
  }, []);

  return (
    <ServiceContext.Provider value={{ services, getAppointments }}>
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
