import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import IUsersType from '@domain/users/entities/IUsersType';

@Entity('user_type')
class UsersType implements IUsersType {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public type: string;

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;
}

export default UsersType;
