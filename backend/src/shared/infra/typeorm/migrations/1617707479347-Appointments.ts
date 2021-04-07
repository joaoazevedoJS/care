import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class Appointments1617707479347 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'service_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'doctor_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'time_minutes',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'date',
            type: 'timestamp with time zone',
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
        foreignKeys: [
          {
            name: 'Service',
            columnNames: ['service_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'services',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'Doctor',
            columnNames: ['doctor_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onUpdate: 'CASCADE',
          },
          {
            name: 'User',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments');
  }
}
