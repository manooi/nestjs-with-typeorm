import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, PrimaryColumn, ManyToMany, JoinTable, OneToOne, OneToMany, Unique } from 'typeorm';
import { School } from '../school/school.entity';
import { AcademicYear } from '../academic-year/academic-year.entity';

@Entity({ name: 'mst_classroom' })
export class ClassRoom {
    @PrimaryGeneratedColumn()
    classroom_id: number;

    @Column({ length: 100 })
    classroom_name: string;

    @Column({ length: 100, nullable: true})
    description: string;

    @ManyToOne(() => School, (a) => a.school_id, {
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    })
    @JoinColumn({ name: "school_id" })
    @Column()
    school_id: number;

    @ManyToOne(() => AcademicYear, (a) => a.academic_year_id, {
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    })
    @JoinColumn({ name: "academic_year_id" })
    @Column()
    academic_year_id: number;
}