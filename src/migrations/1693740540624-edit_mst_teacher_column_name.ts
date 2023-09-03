import { MigrationInterface, QueryRunner } from "typeorm";

export class EditMstTeacherColumnName1693740540624 implements MigrationInterface {
    name = 'EditMstTeacherColumnName1693740540624'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mst_teacher" RENAME COLUMN "study_plan" TO "teacher_unique_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mst_teacher" RENAME COLUMN "teacher_unique_id" TO "study_plan"`);
    }

}
