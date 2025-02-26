import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1739886240865 implements MigrationInterface {
    name = 'Migration1739886240865'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exchanges" RENAME COLUMN "completedAt" TO "updeteAt"`);
        await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "createdDate"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updeteAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "books" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "books" ADD "updeteAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "exchanges" ALTER COLUMN "updeteAt" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exchanges" ALTER COLUMN "updeteAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "updeteAt"`);
        await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updeteAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "books" ADD "createdDate" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "exchanges" RENAME COLUMN "updeteAt" TO "completedAt"`);
    }

}
