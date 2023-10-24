import { MigrationInterface, QueryRunner } from "typeorm";

export class FixStudentClassroomRelationship1696177478158 implements MigrationInterface {
    name = 'FixStudentClassroomRelationship1696177478158'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mst_student_classroom" DROP CONSTRAINT "FK_e326df6f47bfdc015a0e227e27d"`);
        await queryRunner.query(`ALTER TABLE "mst_student_classroom" ADD CONSTRAINT "FK_e326df6f47bfdc015a0e227e27d" FOREIGN KEY ("classroom_id") REFERENCES "mst_classroom"("classroom_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mst_student_classroom" DROP CONSTRAINT "FK_e326df6f47bfdc015a0e227e27d"`);
        await queryRunner.query(`ALTER TABLE "mst_student_classroom" ADD CONSTRAINT "FK_e326df6f47bfdc015a0e227e27d" FOREIGN KEY ("classroom_id") REFERENCES "mst_classroom"("classroom_id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
