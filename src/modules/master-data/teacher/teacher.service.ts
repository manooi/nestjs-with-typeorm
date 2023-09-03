import { Injectable, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Not } from "typeorm";
import { Teacher } from './teacher.entity';

@Injectable()
export class TeacherService {

    constructor(
        @InjectRepository(Teacher) private repo: Repository<Teacher>,
    ) { }

    getAll() {
        return this.repo.find({ order: { teacher_id: 'ASC' } });
    }
}

