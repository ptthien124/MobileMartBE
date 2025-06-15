import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProductTable1701362509000 implements MigrationInterface {
  name = 'CreateProductTable1701362509000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "category_enum" AS ENUM ('mobile', 'tablet', 'mac', 'watch', 'tv');
            CREATE TYPE "discount_type_enum" AS ENUM ('percentage', 'amount');

            CREATE TABLE "product" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "price" decimal(10,2) NOT NULL,
                "discount" decimal(10,2),
                "discount_type" discount_type_enum,
                "description" text NOT NULL,
                "stock" integer NOT NULL,
                "image" character varying NOT NULL,
                "category" category_enum NOT NULL,
                "brand" character varying NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                CONSTRAINT "PK_product" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(`DROP TYPE "discount_type_enum"`);
    await queryRunner.query(`DROP TYPE "category_enum"`);
  }
}
