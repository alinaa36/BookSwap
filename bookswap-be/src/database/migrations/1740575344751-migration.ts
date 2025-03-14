import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1740575344751 implements MigrationInterface {
  name = 'Migration1740575344751';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "exchanges" DROP CONSTRAINT "FK_9b28b74c233cecab5c1a1e8c7ba"`,
    );
    await queryRunner.query(
      `ALTER TABLE "exchanges" RENAME COLUMN "offeredBook" TO "acceptedBook"`,
    );
    await queryRunner.query(
      `ALTER TABLE "exchanges" ADD CONSTRAINT "FK_f00095c9a5154a8a17002b7b074" FOREIGN KEY ("acceptedBook") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "exchanges" DROP CONSTRAINT "FK_f00095c9a5154a8a17002b7b074"`,
    );
    await queryRunner.query(
      `ALTER TABLE "exchanges" RENAME COLUMN "acceptedBook" TO "offeredBook"`,
    );
    await queryRunner.query(
      `ALTER TABLE "exchanges" ADD CONSTRAINT "FK_9b28b74c233cecab5c1a1e8c7ba" FOREIGN KEY ("offeredBook") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
