import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1740574855593 implements MigrationInterface {
  name = 'Migration1740574855593';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."exchanges_status_enum" RENAME TO "exchanges_status_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."exchanges_status_enum" AS ENUM('Pending', 'Completed', 'rejected')`,
    );
    await queryRunner.query(
      `ALTER TABLE "exchanges" ALTER COLUMN "status" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "exchanges" ALTER COLUMN "status" TYPE "public"."exchanges_status_enum" USING "status"::"text"::"public"."exchanges_status_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "exchanges" ALTER COLUMN "status" SET DEFAULT 'Pending'`,
    );
    await queryRunner.query(`DROP TYPE "public"."exchanges_status_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."exchanges_status_enum_old" AS ENUM('Pending', 'Completed')`,
    );
    await queryRunner.query(
      `ALTER TABLE "exchanges" ALTER COLUMN "status" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "exchanges" ALTER COLUMN "status" TYPE "public"."exchanges_status_enum_old" USING "status"::"text"::"public"."exchanges_status_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TABLE "exchanges" ALTER COLUMN "status" SET DEFAULT 'Pending'`,
    );
    await queryRunner.query(`DROP TYPE "public"."exchanges_status_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."exchanges_status_enum_old" RENAME TO "exchanges_status_enum"`,
    );
  }
}
