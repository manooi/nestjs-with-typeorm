import { Injectable, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Not } from "typeorm";
import { Student } from './student.entity';
import { SearchStudentRequestDto } from './dtos/search-student.request.dto';
import { UpsertStudentRequestDto } from './dtos/upsert-student.request.dto';
import { School } from '../school/school.entity';
import { SearchStudentResponse } from './dtos/search-student.response.dto';

@Injectable()
export class StudentService {

    constructor(
        @InjectRepository(Student) private repo: Repository<Student>,
    ) { }

    async searchStudent(req: SearchStudentRequestDto): Promise<SearchStudentResponse[]> {
        let query = this.repo.createQueryBuilder("student");

        if (req.school_id) {
            query = query.where("student.school_id = :param1", { param1: req.school_id });
        }

        if (req.student_name) {
            query = query.where("student_first_name ILIKE :param2 or student_last_name ILIKE :param2", { param2: `%${req.student_name}%` });
        }

        query = query.leftJoinAndSelect(School, "sc", "sc.school_id = student.school_id");
        query = query.addOrderBy('student.student_id', 'ASC').take(100);
        query = query.select(['student.student_id as student_id',
            'student.student_first_name as student_first_name',
            'student.student_last_name as student_last_name',
            'student.student_unique_id as student_unique_id',
            'student.school_id as school_id',
            'sc.school_name as school_name'
        ]);

        return await query.getRawMany() as unknown as SearchStudentResponse[];
    }

    async upsertStudent(req: UpsertStudentRequestDto) {
        const allStudentsInSpecificSchool: Student[] = await this.repo.find({ where: { school_id: req.school_id } });

        let newOrUpdatedStudents: Student[] = [];
        for (let student of req.students) {
            const existingStudent: Student = allStudentsInSpecificSchool.find((s) => s.student_id === student.student_id);

            // update
            if (existingStudent) {
                existingStudent.school_id = req.school_id;
                existingStudent.student_first_name = student.student_first_name;
                existingStudent.student_last_name = student.student_last_name;
                existingStudent.student_unique_id = student.student_unique_id;
                newOrUpdatedStudents.push(existingStudent);
            }

            // insert
            else {
                const newStudent = this.repo.create();
                newStudent.school_id = req.school_id;
                newStudent.student_first_name = student.student_first_name;
                newStudent.student_last_name = student.student_last_name;
                newStudent.student_unique_id = student.student_unique_id;
                newOrUpdatedStudents.push(newStudent);
            }
        }

        return await this.repo.save(newOrUpdatedStudents);

    }
}