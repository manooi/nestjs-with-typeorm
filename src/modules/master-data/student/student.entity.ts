import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { School } from '../school/school.entity';
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

    @ManyToOne(() => School, (a) => a.school_id, {
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    })
    @JoinColumn({ name: "school_id" })
    @Column()
    school_id: number;

    @ManyToMany(() => ClassRoom, {
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    })
    @JoinTable({
        name: "mst_student_classroom",
        joinColumn: {
            name: "student_id",
            referencedColumnName: "student_id"
        },
        inverseJoinColumn: {
            name: "classroom_id",
            referencedColumnName: "classroom_id"
        }
    })
    classrooms: ClassRoom[];
}