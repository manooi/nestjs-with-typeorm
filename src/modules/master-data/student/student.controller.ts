import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StudentService } from './student.service';
import { SearchStudentRequestDto } from './dtos/search-student.request.dto';
import { UpsertStudentRequestDto } from './dtos/upsert-student.request.dto';


@ApiTags('master-data/student')
@Controller('master-data')
export class StudentController {
    constructor(
        private studentService: StudentService
    ) { }

    @Get('student')
    getAllStudents(@Query() req: SearchStudentRequestDto) {
        return this.studentService.searchStudent(req);
    }

    @Post('student')
    upsertSchool(@Body() req: UpsertStudentRequestDto) {
        return this.studentService.upsertStudent(req);
    }
}