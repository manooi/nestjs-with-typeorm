import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, PrimaryColumn, ManyToMany, JoinTable, OneToOne, OneToMany, Unique } from 'typeorm';
import { AcademicYear } from '../academic-year/academic-year.entity';
import { ClassRoom } from '../classroom/classroom.entity';
import { School } from '../school/school.entity';

@Entity({ name: 'mst_subject' })
@Unique(['subject_code', 'academic_year_id'])
export class Subject {
    @PrimaryGeneratedColumn()
    subject_id: number;

    @Column({ length: 20 })
    subject_code: string;

    @Column({ length: 100 })
    subject_name: string;

    @Column({ length: 100 })
    study_plan: string;

    @Column({ type: 'decimal' })
    credit: number;

    @ManyToOne(() => AcademicYear, (a) => a.academic_year_id, {
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    })
    @JoinColumn({ name: "academic_year_id" })
    @Column()
    academic_year_id: number;

    @ManyToMany(() => ClassRoom, (a) => a.classroom_id, {
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    })
    @JoinTable({
        name: "mst_subject_classroom", joinColumn: {
            name: "subject_id",
            referencedColumnName: "subject_id"
        },
        inverseJoinColumn: {
            name: "classroom_id",
            referencedColumnName: "classroom_id"
        }
    })
    classrooms: ClassRoom[];

    @ManyToOne(() => School, (a) => a.school_id, {
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    })
    @JoinColumn({ name: "school_id" })
    @Column()
    school_id: number;
}