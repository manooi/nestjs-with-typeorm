import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeMstStudentRelation1694013152652 implements MigrationInterface {
    name = 'ChangeMstStudentRelation1694013152652'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mst_student" DROP CONSTRAINT "FK_57dea38413c3c2a5278795c5a87"`);
        await queryRunner.query(`ALTER TABLE "mst_student" RENAME COLUMN "classroom_id" TO "school_id"`);
        await queryRunner.query(`ALTER TABLE "mst_student" ALTER COLUMN "school_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "mst_student" ADD CONSTRAINT "FK_c16648518d395c01d9479ac35e8" FOREIGN KEY ("school_id") REFERENCES "mst_school"("school_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mst_student" DROP CONSTRAINT "FK_c16648518d395c01d9479ac35e8"`);
        await queryRunner.query(`ALTER TABLE "mst_student" ALTER COLUMN "school_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "mst_student" RENAME COLUMN "school_id" TO "classroom_id"`);
        await queryRunner.query(`ALTER TABLE "mst_student" ADD CONSTRAINT "FK_57dea38413c3c2a5278795c5a87" FOREIGN KEY ("classroom_id") REFERENCES "mst_classroom"("classroom_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
