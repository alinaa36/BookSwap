import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1738339021225 implements MigrationInterface {
    name = 'Migration1738339021225'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "FK_331478ffd59f87a68b1255b2b6a"`);
        await queryRunner.query(`ALTER TABLE "books" RENAME COLUMN "genreId" TO "genreIdId"`);
        await queryRunner.query(`ALTER TABLE "books" ADD CONSTRAINT "FK_3cbb8333b06455f0b3f9cf0321f" FOREIGN KEY ("genreIdId") REFERENCES "book_genres"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "FK_3cbb8333b06455f0b3f9cf0321f"`);
        await queryRunner.query(`ALTER TABLE "books" RENAME COLUMN "genreIdId" TO "genreId"`);
        await queryRunner.query(`ALTER TABLE "books" ADD CONSTRAINT "FK_331478ffd59f87a68b1255b2b6a" FOREIGN KEY ("genreId") REFERENCES "book_genres"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
