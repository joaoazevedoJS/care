import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import UsersType from '@domain/users/infra/typeorm/entities/UsersType';

export default class CreateUsersTypes implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(UsersType)
      .values([{ type: 'admin' }, { type: 'doctor' }, { type: 'user' }])
      .execute();
  }
}
