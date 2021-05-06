import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class InsertUserData1620320164259 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO users 
            (name, role, email, password) VALUES 
            ('admin', 'adm', 'admin@test.com', '${await bcrypt.hash(
              'admin',
              8,
            )}'),
            ('test', 'client', 'test@test.com', '${await bcrypt.hash(
              '12345',
              8,
            )}');
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE TABLE users CASCADE;`);
  }
}
