import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

import { uuid } from 'uuidv4';

export default class fixNullAppointmentId1592922096590
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'appointments',
      'id',
      new TableColumn({
        name: 'id',
        isPrimary: true,
        type: 'uuid',
        generationStrategy: 'uuid',
        default: 'gen_random_uuid()',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'appointments',
      'id',
      new TableColumn({
        name: 'id',
        isPrimary: true,
        type: 'varchar',
        generationStrategy: 'uuid',
      }),
    );
  }
}
