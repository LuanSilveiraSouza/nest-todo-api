import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1620174000752 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(50) NOT NULL,
          email VARCHAR(50) NOT NULL,
          password CHAR(64) NOT NULL
        );
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE users CASCADE;`);
  }
}
