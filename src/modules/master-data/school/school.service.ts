import { Injectable, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { School } from './school.entity';
import { Repository, In, Not } from "typeorm";
import { UpsertSchoolRequestDto } from './dtos/upsert-school.request.dto';

@Injectable()
export class SchoolService {

    constructor(
        @InjectRepository(School) private repo: Repository<School>,
    ) { }

    getAll() {
        return this.repo.find({ order: { school_id: 'ASC' }, take: 100});
    }

    getSchoolAcademicYearClassRoom() {
        return this.repo.find({ order: { school_id: 'ASC' }, take: 100, relations: ['academic_years', 'academic_years.classrooms'] });
    }

    async upsertSchool(req: UpsertSchoolRequestDto) {
        const existingSchools = await this.repo.find();
        const existingSchoolIds: number[] = existingSchools.map((i) => i.school_id);
        const requestSchoolsId: number[] = req.schools.filter((i) => i.school_id !== null).map((i) => i.school_id);

        // Remove school
        const schoolIdsToRemove: number[] = existingSchoolIds.filter((i) => !requestSchoolsId.includes(i));
        const scoolsToBeRemoved = await this.repo.find({ where: { school_id: In(schoolIdsToRemove) } });
        await this.repo.remove(scoolsToBeRemoved);

        // Add or update school
        const newSchool: School[] = [];
        for await (let sc of req.schools) {
            // Add
            if (sc.school_id === null) {
                const record = this.repo.create();
                record.school_name = sc.school_name;
                record.description = sc.description ?? null;
                newSchool.push(record);
            }

            // Update
            else if (existingSchoolIds.includes(sc.school_id)) {
                const existingRecord = await this.repo.findOne({ where: { school_id: sc.school_id } });
                if (existingRecord) {
                    existingRecord.school_name = sc.school_name;
                    existingRecord.description = sc.description ?? null;
                    newSchool.push(existingRecord);
                }
            }
        }

        return await this.repo.save(newSchool);
    }

    deleteSchool(id: number) {
        return this.repo.delete(id);
    }
}

