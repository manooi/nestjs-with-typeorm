import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { SchoolService } from './school/school.service';
import { UpsertSchoolRequestDto } from './school/dtos/upsert-school.request.dto';
import { ApiTags } from '@nestjs/swagger';
import { TeacherService } from './teacher/teacher.service';
import { EditTeacherRequestDto } from './teacher/dtos/edit-teacher.request.dto';

@ApiTags('master-data')
@Controller('master-data')
export class MasterDataController {
    constructor(
        private schoolService: SchoolService,
        private teacherService: TeacherService
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

    @Get('teacher')
    getTeacher() {
        return this.teacherService.getAll();
    }

    @Post('teacher')
    addTeacher(@Body() req: EditTeacherRequestDto) {
        return this.teacherService.addTeacher(req);
    }

    @Patch('teacher/:id')
    editTeacher(@Param("id") id: string, @Body() req: EditTeacherRequestDto) {
        return this.teacherService.editTeacher(+id, req);
    }

    @Delete('teacher/:id')
    deleteTeacher(@Param("id") id: string) {
        return this.teacherService.deleteTeacher(+id);
    }
}