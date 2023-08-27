import { Controller, Get } from '@nestjs/common';
import { MstAcademicYear } from './academic-year/academic-year.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";

@Controller('master-data')
export class MasterDataController {
    constructor(
        @InjectRepository(MstAcademicYear) private repo: Repository<MstAcademicYear>,
    ) { }

    @Get('academic-year')
    getAllAcademicYear() {
        return this.repo.find();
    }
}