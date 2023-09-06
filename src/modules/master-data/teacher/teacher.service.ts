import { BadRequestException, Injectable, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Not } from "typeorm";
import { Teacher } from './teacher.entity';
import { EditTeacherRequestDto } from './dtos/edit-teacher.request.dto';
import { GetTeacherRequestDto } from './dtos/get-teacher.request.dto';

@Injectable()
export class TeacherService {

    constructor(
        @InjectRepository(Teacher) private repo: Repository<Teacher>,
    ) { }

    searchTeacher(req: GetTeacherRequestDto) {
        let query = this.repo.createQueryBuilder("entity");

        if (req.school_id) {
            query = query.where("school_id = :param1", { param1: req.school_id });
        }

        if (req.student_name) {
            query = query.where("first_name ILIKE :param2 or last_name ILIKE :param2", { param2: `%${req.student_name}%` });
        }

        query = query.addOrderBy('teacher_id', 'ASC').take(100);

        return query.getMany();
    }

    async addTeacher(req: EditTeacherRequestDto) {
        const record = this.repo.create();
        record.first_name = req.first_name;
        record.last_name = req.last_name;
        record.school_id = req.school_id;
        record.teacher_unique_id = "";
        return await this.repo.save(record);
    }

    async editTeacher(teacherId: number, req: EditTeacherRequestDto) {
        if (!teacherId) {
            throw new BadRequestException("teacher id must be number");
        }
        const teacher = await this.repo.findOne({ where: { teacher_id: teacherId } });
        teacher.first_name = req.first_name;
        teacher.last_name = req.last_name;
        teacher.school_id = req.school_id;
        return this.repo.save(teacher);
    }

    async deleteTeacher(teacherId: number) {
        if (!teacherId) {
            throw new BadRequestException("teacher id must be number");
        }
        const teacher = await this.repo.findOne({ where: { teacher_id: teacherId } });
        return this.repo.remove(teacher);
    }
}

