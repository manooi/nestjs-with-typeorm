import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMasterTables1693665552801 implements MigrationInterface {
    name = 'AddMasterTables1693665552801'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "mst_academic_year" ("academic_year_id" SERIAL NOT NULL, "academic_year_name" character varying(10) NOT NULL, "description" character varying(255), "is_active" boolean NOT NULL, CONSTRAINT "PK_385676d6c09a251ed666ba89103" PRIMARY KEY ("academic_year_id"))`);
        await queryRunner.query(`CREATE TABLE "mst_subject" ("subject_id" SERIAL NOT NULL, "subject_code" character varying(20) NOT NULL, "subject_name" character varying(100) NOT NULL, "study_plan" character varying(100) NOT NULL, "credit" numeric NOT NULL, "academic_year_id" integer NOT NULL, CONSTRAINT "UQ_02f7f2a719b04122e43bbe509b8" UNIQUE ("subject_code", "academic_year_id"), CONSTRAINT "PK_113828ee0a7ee9f785a0120860a" PRIMARY KEY ("subject_id"))`);
        await queryRunner.query(`CREATE TABLE "mst_teacher" ("teacher_id" SERIAL NOT NULL, "first_name" character varying(50) NOT NULL, "last_name" character varying(100) NOT NULL, "study_plan" character varying(100) NOT NULL, CONSTRAINT "PK_125a808202f3c2b6208253b0bac" PRIMARY KEY ("teacher_id"))`);
        await queryRunner.query(`CREATE TABLE "mst_teacher_subject" ("teacher_id" integer NOT NULL, "subject_id" integer NOT NULL, CONSTRAINT "PK_a0527ed7b0056513f824423d8f8" PRIMARY KEY ("teacher_id", "subject_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c37a5ecd0213cebe314b5523f2" ON "mst_teacher_subject" ("teacher_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_a6216eb4438daa9145b16ca620" ON "mst_teacher_subject" ("subject_id") `);
        await queryRunner.query(`ALTER TABLE "mst_subject" ADD CONSTRAINT "FK_93f9a970ad07e50417ca70f2f2e" FOREIGN KEY ("academic_year_id") REFERENCES "mst_academic_year"("academic_year_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mst_teacher_subject" ADD CONSTRAINT "FK_c37a5ecd0213cebe314b5523f27" FOREIGN KEY ("teacher_id") REFERENCES "mst_teacher"("teacher_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mst_teacher_subject" ADD CONSTRAINT "FK_a6216eb4438daa9145b16ca620a" FOREIGN KEY ("subject_id") REFERENCES "mst_subject"("subject_id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mst_teacher_subject" DROP CONSTRAINT "FK_a6216eb4438daa9145b16ca620a"`);
        await queryRunner.query(`ALTER TABLE "mst_teacher_subject" DROP CONSTRAINT "FK_c37a5ecd0213cebe314b5523f27"`);
        await queryRunner.query(`ALTER TABLE "mst_subject" DROP CONSTRAINT "FK_93f9a970ad07e50417ca70f2f2e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a6216eb4438daa9145b16ca620"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c37a5ecd0213cebe314b5523f2"`);
        await queryRunner.query(`DROP TABLE "mst_teacher_subject"`);
        await queryRunner.query(`DROP TABLE "mst_teacher"`);
        await queryRunner.query(`DROP TABLE "mst_subject"`);
        await queryRunner.query(`DROP TABLE "mst_academic_year"`);
    }

}
