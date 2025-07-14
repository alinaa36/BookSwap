import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1743420596123 implements MigrationInterface {
    name = 'Migration1743420596123'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "cover_image"`);
        await queryRunner.query(`ALTER TABLE "books" ADD "cover_image" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "cover_image"`);
        await queryRunner.query(`ALTER TABLE "books" ADD "cover_image" bytea`);
    }

}
