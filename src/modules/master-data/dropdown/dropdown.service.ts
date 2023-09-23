import { Injectable, } from '@nestjs/common';
import { AcademicYearService } from '../academic-year/academic-year.service';
import { SchoolService } from '../school/school.service';

@Injectable()
export class DropdownService {
    constructor(
        private schoolService: SchoolService
    ) { }

    getSchoolAcademicYear() {
        return this.schoolService.getSchoolAcademicYearClassRoom();
    }

}

