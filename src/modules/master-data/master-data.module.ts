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


@Module({
    imports: [
        TypeOrmModule.forFeature([School, Teacher, Subject, AcademicYear, ClassRoom]),
    ],
    controllers: [SchoolController, TeacherController],
    providers: [SchoolService, TeacherService],
    exports: []
})
export class MasterDataModule {

}