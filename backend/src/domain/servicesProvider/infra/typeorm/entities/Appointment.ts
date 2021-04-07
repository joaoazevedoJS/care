import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import IAppointment from '@domain/servicesProvider/entities/IAppointments';
import Users from '@domain/users/infra/typeorm/entities/Users';

import Service from './Service';
import Status from './Status';

@Entity('appointments')
class Appointment implements IAppointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  service_id: string;

  @ManyToOne(() => Service, { eager: true })
  @JoinColumn({ name: 'service_id' })
  service: Service;

  @Column()
  status_id: string;

  @ManyToOne(() => Status, { eager: true })
  @JoinColumn({ name: 'status_id' })
  status: Service;

  @Column()
  doctor_id: string;

  @ManyToOne(() => Users)
  @JoinColumn({ name: 'doctor_id' })
  doctor: Users;

  @Column()
  user_id: string;

  @ManyToOne(() => Users)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @Column('int')
  time_minutes: number;

  @Column('int')
  service_time: number;

  @Column('time with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
