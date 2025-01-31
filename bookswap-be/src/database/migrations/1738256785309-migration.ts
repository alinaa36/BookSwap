import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1738256785309 implements MigrationInterface {
    name = 'Migration1738256785309'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "phone_numder" TO "phone"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "phone" TO "phone_numder"`);
    }

}
