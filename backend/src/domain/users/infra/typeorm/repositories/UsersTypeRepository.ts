import { getRepository, Repository } from 'typeorm';

import IUsersType from '@domain/users/entities/IUsersType';
import IUsersTypeRepository from '@domain/users/repositories/IUsersTypeRepository';
import UsersType from '../entities/UsersType';

class UsersTypeRepository implements IUsersTypeRepository {
  private repository: Repository<IUsersType>;

  constructor() {
    this.repository = getRepository(UsersType);
  }

  public async getAdminTypeId(): Promise<string> {
    const admin = await this.repository.findOne({ where: { type: 'admin' } });

    return admin ? admin.id : '1';
  }

  public async getDoctorTypeId(): Promise<string> {
    const doctor = await this.repository.findOne({ where: { type: 'doctor' } });

    return doctor ? doctor.id : '2';
  }

  public async getUserTypeId(): Promise<string> {
    const user = await this.repository.findOne({ where: { type: 'user' } });

    return user ? user.id : '3';
  }
}

export default UsersTypeRepository;
