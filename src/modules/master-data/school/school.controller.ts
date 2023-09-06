import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SchoolService } from './school.service';
import { UpsertSchoolRequestDto } from './dtos/upsert-school.request.dto';

@ApiTags('master-data/school')
@Controller('master-data')
export class SchoolController {
    constructor(
        private schoolService: SchoolService,
    ) { }

    @Get('school')
    getAllSchool() {
        return this.schoolService.getAll();
    }

    @Post('school')
    upsertSchool(@Body() req: UpsertSchoolRequestDto) {
        return this.schoolService.upsertSchool(req);
    }

    @Delete('school/:id')
    delteSchool(@Param("id") id: string) {
        return this.schoolService.deleteSchool(+id);
    }
}