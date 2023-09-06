import { MigrationInterface, QueryRunner } from "typeorm";

export class AddManyToManyRelationWithMstClassroomToMstStudent1694013342378 implements MigrationInterface {
    name = 'AddManyToManyRelationWithMstClassroomToMstStudent1694013342378'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "mst_student_classroom" ("student_id" integer NOT NULL, "classroom_id" integer NOT NULL, CONSTRAINT "PK_aadae1a22c9d42fcfaf73d4bad7" PRIMARY KEY ("student_id", "classroom_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d7ab086273b4ec3a95efbab4ea" ON "mst_student_classroom" ("student_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_e326df6f47bfdc015a0e227e27" ON "mst_student_classroom" ("classroom_id") `);
        await queryRunner.query(`ALTER TABLE "mst_student_classroom" ADD CONSTRAINT "FK_d7ab086273b4ec3a95efbab4eae" FOREIGN KEY ("student_id") REFERENCES "mst_student"("student_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mst_student_classroom" ADD CONSTRAINT "FK_e326df6f47bfdc015a0e227e27d" FOREIGN KEY ("classroom_id") REFERENCES "mst_classroom"("classroom_id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mst_student_classroom" DROP CONSTRAINT "FK_e326df6f47bfdc015a0e227e27d"`);
        await queryRunner.query(`ALTER TABLE "mst_student_classroom" DROP CONSTRAINT "FK_d7ab086273b4ec3a95efbab4eae"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e326df6f47bfdc015a0e227e27"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d7ab086273b4ec3a95efbab4ea"`);
        await queryRunner.query(`DROP TABLE "mst_student_classroom"`);
    }

}
