import { Injectable, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Not } from "typeorm";
import { ClassRoom } from './classroom.entity';
import { SearchClassRoomRequestDto } from './dtos/search-classroom.request.dto';
import { ViewClassRoomSchoolStudent } from './views/view-mst-classroom_school-student';
import { ClassRoomResponse, SearchClassRoomResponseDto } from './dtos/search-classroom.response.dto';

@Injectable()
export class ClassRoomService {

    constructor(
        @InjectRepository(ClassRoom) private repo: Repository<ClassRoom>,
        @InjectRepository(ViewClassRoomSchoolStudent) private view: Repository<ViewClassRoomSchoolStudent>,
    ) { }

    async getAll(req: SearchClassRoomRequestDto): Promise<SearchClassRoomResponseDto> {
        const result = await this.view.find({
            where: {
                ...(req.school_id ? { school_id: req.school_id } : {}),
                ...(req.academic_year_id ? { academic_year_id: req.academic_year_id } : {}),
            }
        });

        const response: SearchClassRoomResponseDto = {
            classrooms: []
        }

        result.forEach((r) => {
            const cr: ClassRoomResponse = {
                school_id: r.school_id,
                school_name: r.school_name,
                academic_year_id: r.academic_year_id,
                academic_year_name: r.academic_year_name,
                classroom_id: r.classroom_id,
                classroom_name: r.classroom_name,
                student_count: +r.student_count
            }
            response.classrooms.push(cr);
        });

        return response;
    }
}

