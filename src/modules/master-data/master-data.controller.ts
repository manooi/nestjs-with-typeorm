import { Controller, Get } from '@nestjs/common';
import { AcademicYear } from './academic-year/academic-year.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";

@Controller('master-data')
export class MasterDataController {
    constructor(
        @InjectRepository(AcademicYear) private repo: Repository<AcademicYear>,
    ) { }

    @Get('academic-year')
    getAllAcademicYear() {
        return this.repo.find();
    }
}