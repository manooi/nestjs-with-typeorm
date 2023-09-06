import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EditTeacherRequestDto } from './dtos/edit-teacher.request.dto';
import { GetTeacherRequestDto } from './dtos/get-teacher.request.dto';
import { TeacherService } from './teacher.service';

@ApiTags('master-data/teacher')
@Controller('master-data')
export class TeacherController {
    constructor(
        private teacherService: TeacherService
    ) { }

    @Get('teacher')
    getTeacher(@Query() req: GetTeacherRequestDto) {
        return this.teacherService.searchTeacher(req);
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