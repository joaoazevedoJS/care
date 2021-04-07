import { getRepository, Repository } from 'typeorm';

import IStatus from '@domain/servicesProvider/entities/IStatus';
import IStatusRepository from '@domain/servicesProvider/repositories/IStatusRepository';

import Status from '../entities/Status';

class StatusRepository implements IStatusRepository {
  private repository: Repository<IStatus>;

  constructor() {
    this.repository = getRepository(Status);
  }

  public async getOpeningId(): Promise<string> {
    const opening = await this.repository.findOne({
      where: { description: 'opening' },
    });

    return opening ? opening.id : '1';
  }

  public async getProgressId(): Promise<string> {
    const progress = await this.repository.findOne({
      where: { description: 'progress' },
    });

    return progress ? progress.id : '2';
  }

  public async getClosedId(): Promise<string> {
    const closed = await this.repository.findOne({
      where: { description: 'closed' },
    });

    return closed ? closed.id : '3';
  }
}

export default StatusRepository;
