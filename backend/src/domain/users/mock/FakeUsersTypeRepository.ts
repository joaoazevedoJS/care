import IUsersType from '../entities/IUsersType';
import IUsersTypeRepository from '../repositories/IUsersTypeRepository';

class UsersTypeRepository implements IUsersTypeRepository {
  private types: IUsersType[] = [];

  constructor() {
    const admin = { id: '1', type: 'admin' };
    const doctor = { id: '2', type: 'doctor' };
    const user = { id: '3', type: 'user' };

    this.types.push(admin);
    this.types.push(doctor);
    this.types.push(user);
  }

  public async getAdminTypeId(): Promise<string> {
    const admin = this.types.find(type => type.type === 'admin');

    return admin ? admin.id : '1';
  }

  public async getDoctorTypeId(): Promise<string> {
    const doctor = this.types.find(type => type.type === 'doctor');

    return doctor ? doctor.id : '2';
  }

  public async getUserTypeId(): Promise<string> {
    const user = this.types.find(type => type.type === 'user');

    return user ? user.id : '3';
  }
}

export default UsersTypeRepository;
