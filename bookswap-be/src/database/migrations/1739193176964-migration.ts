import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1739193176964 implements MigrationInterface {
    name = 'Migration1739193176964'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" ALTER COLUMN "cover_image" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" ALTER COLUMN "cover_image" SET NOT NULL`);
    }

}
