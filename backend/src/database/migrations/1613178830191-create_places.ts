import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createPlaces1613178830191 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'places',
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'name',
          type: 'varchar',
        },
        {
          name: 'latitude',
          type: 'decimal',
          scale: 10,
          precision: 2,
        },
        {
          name: 'longitude',
          type: 'decimal',
          scale: 10,
          precision: 2,
        },
        {
          name: 'about',
          type: 'text',
        },
        {
          name: 'veg_type',
          type: 'text',
        },
        {
          name: 'open_on_weekends',
          type: 'boolean',
          default: false,
        },
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> { // DESFAZER O QUE FOI FEITO NO MÉTODO UP
    await queryRunner.dropTable('places');
  }
}
