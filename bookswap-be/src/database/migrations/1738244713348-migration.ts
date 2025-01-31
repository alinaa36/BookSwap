import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1738244713348 implements MigrationInterface {
  name = 'Migration1738244713348';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "book_genres" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_afd20a2f22d0efc47c5f80e14a5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "language" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_cc0a99e710eb3733f6fb42b1d4c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "lastname" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "photo" bytea, "phone_numder" character varying NOT NULL, "rating" integer, "desire" character varying, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "books" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "author" character varying NOT NULL, "deskription" character varying, "condition" "public"."books_condition_enum" NOT NULL DEFAULT 'new', "cover_image" bytea NOT NULL, "availability" boolean NOT NULL DEFAULT true, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "genreId" integer, "languageId" integer, "ownerId" integer, CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "exchanges" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "status" "public"."exchanges_status_enum" NOT NULL DEFAULT 'Pending', "completedAt" TIMESTAMP DEFAULT now(), "offeredBook" integer, "requestedBook" integer, "offeringUser" integer, "requestingUser" integer, CONSTRAINT "PK_17ccd29473f939c68de98c2cea3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "books_categories_category" ("booksId" integer NOT NULL, "categoryId" integer NOT NULL, CONSTRAINT "PK_ed8b4bc6c4266a008949d814c89" PRIMARY KEY ("booksId", "categoryId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9184932d6e7b25d8b77dc3ca4d" ON "books_categories_category" ("booksId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1d7f4e826ca32841c9ae839196" ON "books_categories_category" ("categoryId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "books" ADD CONSTRAINT "FK_331478ffd59f87a68b1255b2b6a" FOREIGN KEY ("genreId") REFERENCES "book_genres"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "books" ADD CONSTRAINT "FK_49060974a6295b7f70ac2c102b5" FOREIGN KEY ("languageId") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "books" ADD CONSTRAINT "FK_82209aa3c485bb7f7e7e8374c66" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "exchanges" ADD CONSTRAINT "FK_9b28b74c233cecab5c1a1e8c7ba" FOREIGN KEY ("offeredBook") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "exchanges" ADD CONSTRAINT "FK_eb36974ad6df2fedbbf770acd58" FOREIGN KEY ("requestedBook") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "exchanges" ADD CONSTRAINT "FK_22d5a0d617096c39052aa0cd62c" FOREIGN KEY ("offeringUser") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "exchanges" ADD CONSTRAINT "FK_c5d96e8cf78e2d62a631e12d46c" FOREIGN KEY ("requestingUser") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "books_categories_category" ADD CONSTRAINT "FK_9184932d6e7b25d8b77dc3ca4da" FOREIGN KEY ("booksId") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "books_categories_category" ADD CONSTRAINT "FK_1d7f4e826ca32841c9ae8391967" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "books_categories_category" DROP CONSTRAINT "FK_1d7f4e826ca32841c9ae8391967"`,
    );
    await queryRunner.query(
      `ALTER TABLE "books_categories_category" DROP CONSTRAINT "FK_9184932d6e7b25d8b77dc3ca4da"`,
    );
    await queryRunner.query(
      `ALTER TABLE "exchanges" DROP CONSTRAINT "FK_c5d96e8cf78e2d62a631e12d46c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "exchanges" DROP CONSTRAINT "FK_22d5a0d617096c39052aa0cd62c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "exchanges" DROP CONSTRAINT "FK_eb36974ad6df2fedbbf770acd58"`,
    );
    await queryRunner.query(
      `ALTER TABLE "exchanges" DROP CONSTRAINT "FK_9b28b74c233cecab5c1a1e8c7ba"`,
    );
    await queryRunner.query(
      `ALTER TABLE "books" DROP CONSTRAINT "FK_82209aa3c485bb7f7e7e8374c66"`,
    );
    await queryRunner.query(
      `ALTER TABLE "books" DROP CONSTRAINT "FK_49060974a6295b7f70ac2c102b5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "books" DROP CONSTRAINT "FK_331478ffd59f87a68b1255b2b6a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1d7f4e826ca32841c9ae839196"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9184932d6e7b25d8b77dc3ca4d"`,
    );
    await queryRunner.query(`DROP TABLE "books_categories_category"`);
    await queryRunner.query(`DROP TABLE "exchanges"`);
    await queryRunner.query(`DROP TABLE "books"`);
    await queryRunner.query(`DROP TABLE "category"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "language"`);
    await queryRunner.query(`DROP TABLE "book_genres"`);
  }
}
