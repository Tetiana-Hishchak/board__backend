import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables implements MigrationInterface {
  name = 'CreateTables'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "board" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "PK_board_id" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "column_entity" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "boardId" uuid,
        "column_order" int NOT NULL,
        CONSTRAINT "PK_column_entity_id" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "card" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "title" character varying NOT NULL,
        "description" text,
        "columnId" uuid,
        CONSTRAINT "PK_card_id" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      ALTER TABLE "column_entity"
      ADD CONSTRAINT "FK_column_entity_board"
      FOREIGN KEY ("boardId")
      REFERENCES "board"("id")
      ON DELETE CASCADE
    `);

    await queryRunner.query(`
      ALTER TABLE "card"
      ADD CONSTRAINT "FK_card_column"
      FOREIGN KEY ("columnId")
      REFERENCES "column_entity"("id")
      ON DELETE CASCADE
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "card" DROP CONSTRAINT "FK_card_column"`);
    await queryRunner.query(`ALTER TABLE "column_entity" DROP CONSTRAINT "FK_column_entity_board"`);
    await queryRunner.query(`DROP TABLE "card"`);
    await queryRunner.query(`DROP TABLE "column_entity"`);
    await queryRunner.query(`DROP TABLE "board"`);
  }
}
