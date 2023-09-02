import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMstClassroom1693666067206 implements MigrationInterface {
    name = 'AddMstClassroom1693666067206'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "mst_classroom" ("classroom_id" SERIAL NOT NULL, "classroom_name" character varying(100) NOT NULL, "description" character varying(100), CONSTRAINT "PK_780927217b2b206203ef084606b" PRIMARY KEY ("classroom_id"))`);
        await queryRunner.query(`CREATE TABLE "mst_subject_classroom" ("subject_id" integer NOT NULL, "classroom_id" integer NOT NULL, CONSTRAINT "PK_6bdc368aeb7abee8b6ad96e4dc8" PRIMARY KEY ("subject_id", "classroom_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9abadd92b074fbeebaf7398e67" ON "mst_subject_classroom" ("subject_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_9101cd55a56712d5971866ebd9" ON "mst_subject_classroom" ("classroom_id") `);
        await queryRunner.query(`ALTER TABLE "mst_subject_classroom" ADD CONSTRAINT "FK_9abadd92b074fbeebaf7398e677" FOREIGN KEY ("subject_id") REFERENCES "mst_subject"("subject_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mst_subject_classroom" ADD CONSTRAINT "FK_9101cd55a56712d5971866ebd9e" FOREIGN KEY ("classroom_id") REFERENCES "mst_classroom"("classroom_id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mst_subject_classroom" DROP CONSTRAINT "FK_9101cd55a56712d5971866ebd9e"`);
        await queryRunner.query(`ALTER TABLE "mst_subject_classroom" DROP CONSTRAINT "FK_9abadd92b074fbeebaf7398e677"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9101cd55a56712d5971866ebd9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9abadd92b074fbeebaf7398e67"`);
        await queryRunner.query(`DROP TABLE "mst_subject_classroom"`);
        await queryRunner.query(`DROP TABLE "mst_classroom"`);
    }

}
