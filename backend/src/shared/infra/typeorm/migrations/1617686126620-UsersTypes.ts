import UsersType from '@domain/users/infra/typeorm/entities/UsersType';
import { getRepository, MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class UsersTypes1617686126620 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_type',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'type',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    const userTypeRepository = getRepository(UsersType);

    const admin = userTypeRepository.create({
      type: 'admin',
    });

    const doctor = userTypeRepository.create({
      type: 'doctor',
    });

    const user = userTypeRepository.create({
      type: 'user',
    });

    userTypeRepository.save(admin);
    userTypeRepository.save(doctor);
    userTypeRepository.save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_type');
  }
}
