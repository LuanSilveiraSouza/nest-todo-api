import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1620174000752 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE user_role AS ENUM('adm', 'client');
    `);

    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(50) NOT NULL,
          role user_role NOT NULL,
          email VARCHAR(50) NOT NULL,
          password CHAR(60) NOT NULL
        );
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE users CASCADE;`);
    await queryRunner.query(`DROP TYPE user_role;`);
  }
}
