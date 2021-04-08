import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import IUsers from '@domain/users/entities/IUsers';

import UsersType from './UsersType';

@Entity('users')
class Users implements IUsers {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public email: string;

  @Column()
  public name: string;

  @Column()
  public password: string;

  @Column()
  public user_avatar: string;

  @Column()
  public bio: string;

  @Column()
  public user_type_id: string;

  @ManyToOne(() => UsersType, { eager: true })
  @JoinColumn({ name: 'user_type_id' })
  public user_type: UsersType;

  @Column('bool')
  public verified_account: boolean;

  @Column()
  public verification_code: string;

  @Column('integer')
  public mail_resend_count: number;

  @Column('time with time zone')
  public mail_limit_date_resend: Date;

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;
}

export default Users;
