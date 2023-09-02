import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ClassRoom } from '../classroom/classroom.entity';

@Entity({ name: 'mst_student' })
export class Student {
    @PrimaryGeneratedColumn()
    student_id: number;

    @Column({ length: 100 })
    student_unique_id: string;

    @Column({ length: 100 })
    student_first_name: string;

    @Column({ length: 100 })
    student_last_name: string;

    @ManyToOne(() => ClassRoom, (a) => a.classroom_id, {
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    })
    @JoinColumn({ name: "classroom_id" })
    classroom_id: number;
}