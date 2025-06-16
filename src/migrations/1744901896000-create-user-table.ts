import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1744901896000 implements MigrationInterface {
  name = 'CreateUserTable1744901896000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE "role_enum" AS ENUM ('user', 'admin');

      CREATE TABLE "user" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" VARCHAR NOT NULL,
        "username" VARCHAR NOT NULL,
        "password" VARCHAR NOT NULL,
        "role" role_enum NOT NULL DEFAULT 'user',
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "deleted_at" TIMESTAMP WITH TIME ZONE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "user";
      DROP TYPE "role_enum";
    `);
  }
}
