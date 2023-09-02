import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMstSchool1693666659272 implements MigrationInterface {
    name = 'AddMstSchool1693666659272'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "mst_school" ("school_id" SERIAL NOT NULL, "school_name" character varying(250) NOT NULL, "description" character varying(100), CONSTRAINT "PK_4d9d1edb5570841240f2ba8553d" PRIMARY KEY ("school_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "mst_school"`);
    }

}
