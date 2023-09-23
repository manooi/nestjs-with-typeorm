import { BadRequestException, Injectable, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Not } from "typeorm";
import { AcademicYear } from './academic-year.entity';
import { AddOrEditAcademicYearRequestDto } from './dtos/add-or-edit-academic-year.request.dto';
import { SearchAcademicYearRequestDto } from './dtos/search-academic-year.request.dto';

@Injectable()
export class AcademicYearService {

    constructor(
        @InjectRepository(AcademicYear) private repo: Repository<AcademicYear>,
    ) { }

    async getAll(req: SearchAcademicYearRequestDto) {
        return await this.repo.find({ where: { school_id: req.school_id }, relations: ['school'] });
    }

    async addAcademicYear(req: AddOrEditAcademicYearRequestDto) {
        const record = this.repo.create();
        record.academic_year_name = req.academic_year_name;
        record.description = req.description;
        record.is_active = req.is_active;
        record.school_id = req.school_id;
        return await this.repo.save(record);
    }

    async editAcademicYear(academicYearId: number, req: AddOrEditAcademicYearRequestDto) {
        if (!academicYearId) {
            throw new BadRequestException("academic_year_id must be number");
        }

        const existingRecord = await this.repo.findOne({ where: { academic_year_id: academicYearId } });
        if (!existingRecord) {
            throw new BadRequestException("This academic_year_id does not exist");
        }

        existingRecord.academic_year_name = req.academic_year_name;
        existingRecord.description = req.description;
        existingRecord.is_active = req.is_active;
        return await this.repo.save(existingRecord);
    }

    async deleteAcademicYear(academicYearId: number) {
        if (!academicYearId) {
            throw new BadRequestException("academic_year_id must be number");
        }

        const existingRecord = await this.repo.findOne({ where: { academic_year_id: academicYearId } });
        if (!existingRecord) {
            throw new BadRequestException("This academic_year_id does not exist");
        }

        return this.repo.remove(existingRecord);
    }

}

