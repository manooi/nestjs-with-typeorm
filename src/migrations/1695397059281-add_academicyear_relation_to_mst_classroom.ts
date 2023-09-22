import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAcademicyearRelationToMstClassroom1695397059281 implements MigrationInterface {
    name = 'AddAcademicyearRelationToMstClassroom1695397059281'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mst_classroom" ADD "academic_year_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "mst_classroom" ADD CONSTRAINT "FK_c8a2febff15eaeb9d259345ed97" FOREIGN KEY ("academic_year_id") REFERENCES "mst_academic_year"("academic_year_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mst_classroom" DROP CONSTRAINT "FK_c8a2febff15eaeb9d259345ed97"`);
        await queryRunner.query(`ALTER TABLE "mst_classroom" DROP COLUMN "academic_year_id"`);
    }

}
