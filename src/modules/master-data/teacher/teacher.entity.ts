import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Subject } from '../subject/subject.entity';

@Entity({ name: 'mst_teacher' })
export class Teacher {
    @PrimaryGeneratedColumn()
    teacher_id: number;

    @Column({ length: 50 })
    first_name: string;

    @Column({ length: 100 })
    last_name: string;

    @Column({ length: 100 })
    study_plan: string;

    @ManyToMany(() => Subject, {
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    })
    @JoinTable({
        name: "mst_teacher_subject",
        joinColumn: {
            name: "teacher_id",
            referencedColumnName: "teacher_id"
        },
        inverseJoinColumn: {
            name: "subject_id",
            referencedColumnName: "subject_id"
        }
    })
    subjects: Subject[]
}