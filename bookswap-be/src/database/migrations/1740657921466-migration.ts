import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1740657921466 implements MigrationInterface {
    name = 'Migration1740657921466'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exchanges" DROP CONSTRAINT "FK_c5d96e8cf78e2d62a631e12d46c"`);
        await queryRunner.query(`ALTER TABLE "exchanges" DROP CONSTRAINT "FK_22d5a0d617096c39052aa0cd62c"`);
        await queryRunner.query(`ALTER TABLE "exchanges" DROP CONSTRAINT "FK_eb36974ad6df2fedbbf770acd58"`);
        await queryRunner.query(`CREATE TABLE "exchanges_item" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updeteAt" TIMESTAMP NOT NULL DEFAULT now(), "exchangeId" integer, "bookId" integer, CONSTRAINT "PK_b33f99e14d9f981096629e013e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "exchanges" DROP COLUMN "requestingUser"`);
        await queryRunner.query(`ALTER TABLE "exchanges" DROP COLUMN "offeringUser"`);
        await queryRunner.query(`ALTER TABLE "exchanges" DROP COLUMN "requestedBook"`);
        await queryRunner.query(`ALTER TABLE "exchanges" DROP COLUMN "acceptedBook"`);
        await queryRunner.query(`ALTER TABLE "exchanges" ADD "requesterId" integer`);
        await queryRunner.query(`ALTER TABLE "exchanges" ADD "receiverId" integer`);
        await queryRunner.query(`ALTER TABLE "exchanges_item" ADD CONSTRAINT "FK_93db4f6bd709f39f715661e4e08" FOREIGN KEY ("exchangeId") REFERENCES "exchanges"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exchanges_item" ADD CONSTRAINT "FK_99b705322288ad89dc4ea0bb83f" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exchanges" ADD CONSTRAINT "FK_69066d980b9dd6e4d752bcdbca7" FOREIGN KEY ("requesterId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exchanges" ADD CONSTRAINT "FK_0f98c39b8b447471c148d1eacac" FOREIGN KEY ("receiverId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exchanges" DROP CONSTRAINT "FK_0f98c39b8b447471c148d1eacac"`);
        await queryRunner.query(`ALTER TABLE "exchanges" DROP CONSTRAINT "FK_69066d980b9dd6e4d752bcdbca7"`);
        await queryRunner.query(`ALTER TABLE "exchanges_item" DROP CONSTRAINT "FK_99b705322288ad89dc4ea0bb83f"`);
        await queryRunner.query(`ALTER TABLE "exchanges_item" DROP CONSTRAINT "FK_93db4f6bd709f39f715661e4e08"`);
        await queryRunner.query(`ALTER TABLE "exchanges" DROP COLUMN "receiverId"`);
        await queryRunner.query(`ALTER TABLE "exchanges" DROP COLUMN "requesterId"`);
        await queryRunner.query(`ALTER TABLE "exchanges" ADD "acceptedBook" integer`);
        await queryRunner.query(`ALTER TABLE "exchanges" ADD "requestedBook" integer`);
        await queryRunner.query(`ALTER TABLE "exchanges" ADD "offeringUser" integer`);
        await queryRunner.query(`ALTER TABLE "exchanges" ADD "requestingUser" integer`);
        await queryRunner.query(`DROP TABLE "exchanges_item"`);
        await queryRunner.query(`ALTER TABLE "exchanges" ADD CONSTRAINT "FK_eb36974ad6df2fedbbf770acd58" FOREIGN KEY ("requestedBook") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exchanges" ADD CONSTRAINT "FK_22d5a0d617096c39052aa0cd62c" FOREIGN KEY ("offeringUser") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exchanges" ADD CONSTRAINT "FK_c5d96e8cf78e2d62a631e12d46c" FOREIGN KEY ("requestingUser") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
