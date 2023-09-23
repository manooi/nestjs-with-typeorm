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
import { AcademicYearService } from "./academic-year/academic-year.service";
import { AcademicYearController } from "./academic-year/academic-year.controller";
import { DropdownService } from "./dropdown/dropdown.service";
import { DropdownController } from "./dropdown/dropdown.controller";


@Module({
    imports: [
        TypeOrmModule.forFeature([School, Teacher, Subject, AcademicYear, ClassRoom, Student]),
    ],
    controllers: [
        AcademicYearController,
        SchoolController,
        TeacherController,
        StudentController,
        DropdownController
    ],
    providers: [
        AcademicYearService,
        SchoolService,
        TeacherService,
        StudentService,
        DropdownService
    ],
    exports: []
})
export class MasterDataModule {

}