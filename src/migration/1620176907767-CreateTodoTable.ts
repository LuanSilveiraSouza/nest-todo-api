import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTodoTable1620176907767 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS todos (
              id SERIAL PRIMARY KEY,
              description VARCHAR(140) NOT NULL,
              due_date TIMESTAMPZ,
              completed_at TIMESTAMPTZ,
              user_id INT,
              CONSTRAINT fk_todo_user FOREIGN KEY(user_id) REFERENCES users(id),
              created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
              updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            );
          `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE todos CASCADE;`);
  }
}
