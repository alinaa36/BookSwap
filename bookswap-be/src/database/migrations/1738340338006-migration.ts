import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1738340338006 implements MigrationInterface {
    name = 'Migration1738340338006'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "FK_331478ffd59f87a68b1255b2b6a"`);
        await queryRunner.query(`CREATE TABLE "genres" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_80ecd718f0f00dde5d77a9be842" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "books" ADD CONSTRAINT "FK_331478ffd59f87a68b1255b2b6a" FOREIGN KEY ("genreId") REFERENCES "genres"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "FK_331478ffd59f87a68b1255b2b6a"`);
        await queryRunner.query(`DROP TABLE "genres"`);
        await queryRunner.query(`ALTER TABLE "books" ADD CONSTRAINT "FK_331478ffd59f87a68b1255b2b6a" FOREIGN KEY ("genreId") REFERENCES "book_genres"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
