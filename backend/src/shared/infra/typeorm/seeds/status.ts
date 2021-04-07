import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import Status from '@domain/servicesProvider/infra/typeorm/entities/Status';

export default class CreateStatus implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Status)
      .values([
        { description: 'opening' },
        { description: 'progress' },
        { description: 'closed' },
      ])
      .execute();
  }
}
