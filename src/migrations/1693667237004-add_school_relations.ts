import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSchoolRelations1693667237004 implements MigrationInterface {
    name = 'AddSchoolRelations1693667237004'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mst_academic_year" ADD "school_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "mst_classroom" ADD "school_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "mst_subject" ADD "school_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "mst_teacher" ADD "school_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "mst_academic_year" ADD CONSTRAINT "FK_869efb6a9160834dcf312ded4a7" FOREIGN KEY ("school_id") REFERENCES "mst_school"("school_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mst_classroom" ADD CONSTRAINT "FK_4ebda0f0cda95fc424d1cb13b98" FOREIGN KEY ("school_id") REFERENCES "mst_school"("school_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mst_subject" ADD CONSTRAINT "FK_014d5f6916af26c57a1ec971d85" FOREIGN KEY ("school_id") REFERENCES "mst_school"("school_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mst_teacher" ADD CONSTRAINT "FK_7f92773f8104ee9549d1598f8cf" FOREIGN KEY ("school_id") REFERENCES "mst_school"("school_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mst_teacher" DROP CONSTRAINT "FK_7f92773f8104ee9549d1598f8cf"`);
        await queryRunner.query(`ALTER TABLE "mst_subject" DROP CONSTRAINT "FK_014d5f6916af26c57a1ec971d85"`);
        await queryRunner.query(`ALTER TABLE "mst_classroom" DROP CONSTRAINT "FK_4ebda0f0cda95fc424d1cb13b98"`);
        await queryRunner.query(`ALTER TABLE "mst_academic_year" DROP CONSTRAINT "FK_869efb6a9160834dcf312ded4a7"`);
        await queryRunner.query(`ALTER TABLE "mst_teacher" DROP COLUMN "school_id"`);
        await queryRunner.query(`ALTER TABLE "mst_subject" DROP COLUMN "school_id"`);
        await queryRunner.query(`ALTER TABLE "mst_classroom" DROP COLUMN "school_id"`);
        await queryRunner.query(`ALTER TABLE "mst_academic_year" DROP COLUMN "school_id"`);
    }

}
