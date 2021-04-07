import IStatus from '../entities/IStatus';
import IStatusRepository from '../repositories/IStatusRepository';

class FakeStatusRepository implements IStatusRepository {
  private status: IStatus[] = [];

  constructor() {
    const admin = {
      id: '1',
      description: 'admin',
      created_at: new Date(),
      updated_at: new Date(),
    };

    const doctor = {
      id: '2',
      description: 'doctor',
      created_at: new Date(),
      updated_at: new Date(),
    };

    const user = {
      id: '3',
      description: 'user',
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.status.push(admin);
    this.status.push(doctor);
    this.status.push(user);
  }

  public async getOpeningId(): Promise<string> {
    const opening = this.status.find(
      status => status.description === 'opening',
    );

    return opening ? opening.id : '1';
  }

  public async getProgressId(): Promise<string> {
    const progress = this.status.find(
      status => status.description === 'progress',
    );

    return progress ? progress.id : '2';
  }

  public async getClosedId(): Promise<string> {
    const closed = this.status.find(status => status.description === 'closed');

    return closed ? closed.id : '3';
  }
}

export default FakeStatusRepository;
