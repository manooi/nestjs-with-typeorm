import { Injectable, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Not } from "typeorm";
import { Student } from './student.entity';
import { SearchStudentRequestDto } from './dtos/search-student.request.dto';
import { UpsertStudentRequestDto } from './dtos/upsert-student.request.dto';
import { School } from '../school/school.entity';
import { ClassRoom } from '../classroom/classroom.entity';

@Injectable()
export class StudentService {

    constructor(
        @InjectRepository(Student) private studentRepo: Repository<Student>,
        @InjectRepository(ClassRoom) private classRoomRepo: Repository<ClassRoom>,
    ) { }

    async searchStudent(req: SearchStudentRequestDto) {
        let query = this.studentRepo
            .createQueryBuilder('student')
            .where('student.school_id = :schoolId', { schoolId: req.school_id })
            .leftJoinAndSelect('student.school', 'school')
            .leftJoinAndSelect('student.classrooms', 'classroom')
            .andWhere('classroom.academic_year_id = :academicYearId', { academicYearId: req.academic_year_id })

        if (req.classroom_id) {
            query = query.andWhere('classroom.classroom_id = :classroomId', { classroomId: req.classroom_id });
        }

        if (req.student_name) {
            query = query.andWhere(
                '(student.student_first_name ILIKE :student_name or student.student_last_name ILIKE :student_name)',
                { student_name: `%${req.student_name}%` }
            )
        }

        query = query.limit(500);

        return await query.getMany();
    }

    async upsertStudent(req: UpsertStudentRequestDto) {
        const allStudentsInSpecificSchool: Student[] = await this.studentRepo.find({ where: { school_id: req.school_id }, relations: ['classrooms'] });

        for await (let cr of req.classrooms) {

            let existingOrNewClassRoom: ClassRoom;

            if (cr.classroom_id === null) {
                existingOrNewClassRoom = this.classRoomRepo.create();
                existingOrNewClassRoom.classroom_name = cr.classroom_name;
                existingOrNewClassRoom.academic_year_id = req.academic_year_id;
                existingOrNewClassRoom.school_id = req.school_id;
                await this.classRoomRepo.save(existingOrNewClassRoom);
            }
            else {
                existingOrNewClassRoom = await this.classRoomRepo.findOne({ where: { classroom_id: cr.classroom_id } });
            }

            let newOrUpdatedStudents: Student[] = [];
            for (let student of cr.students) {
                const existingStudent: Student = allStudentsInSpecificSchool.find((s) => s.student_id === student.student_id);

                // update
                if (existingStudent) {
                    existingStudent.school_id = req.school_id;
                    existingStudent.student_first_name = student.student_first_name;
                    existingStudent.student_last_name = student.student_last_name;
                    existingStudent.student_unique_id = student.student_unique_id;
                    existingStudent.classrooms.push(existingOrNewClassRoom);
                    newOrUpdatedStudents.push(existingStudent);
                }

                // insert
                else {
                    const newStudent = this.studentRepo.create();
                    newStudent.school_id = req.school_id;
                    newStudent.student_first_name = student.student_first_name;
                    newStudent.student_last_name = student.student_last_name;
                    newStudent.student_unique_id = student.student_unique_id;
                    newStudent.classrooms = [existingOrNewClassRoom]
                    newOrUpdatedStudents.push(newStudent);
                }
            }

            await this.studentRepo.save(newOrUpdatedStudents);
        }
        return true;
    }
}