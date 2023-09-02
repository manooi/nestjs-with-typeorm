import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMasterStudent1693668162037 implements MigrationInterface {
    name = 'AddMasterStudent1693668162037'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "mst_student" ("student_id" SERIAL NOT NULL, "student_unique_id" character varying(100) NOT NULL, "student_first_name" character varying(100) NOT NULL, "student_last_name" character varying(100) NOT NULL, "classroom_id" integer, CONSTRAINT "PK_137961d231bbba4c7351a8ca98a" PRIMARY KEY ("student_id"))`);
        await queryRunner.query(`ALTER TABLE "mst_student" ADD CONSTRAINT "FK_57dea38413c3c2a5278795c5a87" FOREIGN KEY ("classroom_id") REFERENCES "mst_classroom"("classroom_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mst_student" DROP CONSTRAINT "FK_57dea38413c3c2a5278795c5a87"`);
        await queryRunner.query(`DROP TABLE "mst_student"`);
    }

}
