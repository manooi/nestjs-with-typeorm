import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AcademicYearService } from './academic-year.service';
import { AddOrEditAcademicYearRequestDto } from './dtos/add-or-edit-academic-year.request.dto';
import { SearchAcademicYearRequestDto } from './dtos/search-academic-year.request.dto';

@ApiTags('master-data/academic-year')
@Controller('master-data')
export class AcademicYearController {
    constructor(
        private academicYearService: AcademicYearService,
    ) { }

    @Get('academic-year')
    getAllSchool(@Query() req: SearchAcademicYearRequestDto) {
        return this.academicYearService.getAll(req);
    }

    @Post('academic-year')
    addAcademicYear(@Body() req: AddOrEditAcademicYearRequestDto) {
        return this.academicYearService.addAcademicYear(req);
    }

    @Patch('academic-year/:id')
    editAcademicYear(@Param("id") id: string,@Body() req: AddOrEditAcademicYearRequestDto) {
        return this.academicYearService.editAcademicYear(+id, req);
    }

    @Delete('academic-year/:id')
    deleteAcademicYear(@Param("id") id: string) {
        return this.academicYearService.deleteAcademicYear(+id);
    }
}