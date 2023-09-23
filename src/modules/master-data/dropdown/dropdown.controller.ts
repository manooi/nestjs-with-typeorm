import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DropdownService } from './dropdown.service';

@ApiTags('master-data/dropdown')
@Controller('master-data')
export class DropdownController {
    constructor(
        private dropdownService: DropdownService,
    ) { }

    @Get('school-academic-year')
    getAllSchool() {
        return this.dropdownService.getSchoolAcademicYear();
    }
}