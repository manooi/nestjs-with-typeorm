import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { School } from "./school/school.entity";
import { SchoolService } from './school/school.service';
import { Teacher } from "./teacher/teacher.entity";
import { Subject } from "./subject/subject.entity";
import { AcademicYear } from "./academic-year/academic-year.entity";
import { ClassRoom } from "./classroom/classroom.entity";
import { TeacherService } from "./teacher/teacher.service";
import { SchoolController } from "./school/school.controller";
import { TeacherController } from "./teacher/teacher.controller";
import { StudentController } from "./student/student.controller";
import { StudentService } from "./student/student.service";
import { Student } from "./student/student.entity";


@Module({
    imports: [
        TypeOrmModule.forFeature([School, Teacher, Subject, AcademicYear, ClassRoom, Student]),
    ],
    controllers: [SchoolController, TeacherController, StudentController],
    providers: [SchoolService, TeacherService, StudentService],
    exports: []
})
export class MasterDataModule {

}