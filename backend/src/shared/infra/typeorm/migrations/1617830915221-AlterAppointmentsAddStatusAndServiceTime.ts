import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterAppointmentsAddStatusAndServiceTime1617830915221
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'service_time',
        type: 'int',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'status_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'StatusAppointment',
        columnNames: ['status_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'status',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'StatusAppointment');
    await queryRunner.dropColumn('appointments', 'status_id');
    await queryRunner.dropColumn('appointments', 'service_time');
  }
}
