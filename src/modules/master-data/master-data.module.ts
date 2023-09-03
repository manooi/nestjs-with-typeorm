import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MasterDataController } from './master-data.controller';
import { School } from "./school/school.entity";
import { SchoolService } from './school/school.service';
import { Teacher } from "./teacher/teacher.entity";
import { Subject } from "./subject/subject.entity";
import { AcademicYear } from "./academic-year/academic-year.entity";
import { ClassRoom } from "./classroom/classroom.entity";
import { TeacherService } from "./teacher/teacher.service";


@Module({
    imports: [
        TypeOrmModule.forFeature([School, Teacher, Subject, AcademicYear, ClassRoom]),
    ],
    controllers: [MasterDataController],
    providers: [SchoolService, TeacherService],
    exports: []
})
export class MasterDataModule {

}