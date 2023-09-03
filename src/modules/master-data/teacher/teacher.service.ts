import { BadRequestException, Injectable, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Not } from "typeorm";
import { Teacher } from './teacher.entity';
import { EditTeacherRequestDto } from './dtos/edit-teacher.request.dto';

@Injectable()
export class TeacherService {

    constructor(
        @InjectRepository(Teacher) private repo: Repository<Teacher>,
    ) { }

    getAll() {
        return this.repo.find({ order: { teacher_id: 'ASC' }, take: 100 });
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

