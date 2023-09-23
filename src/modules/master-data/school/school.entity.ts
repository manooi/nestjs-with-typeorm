import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { AcademicYear } from '../academic-year/academic-year.entity';

@Entity({ name: 'mst_school' })
export class School {
    @PrimaryGeneratedColumn()
    school_id: number;

    @Column({ length: 250 })
    school_name: string;

    @Column({ length: 100, nullable: true })
    description: string;

    @OneToMany(() => AcademicYear, (a) => a.school_id)
    @JoinColumn({ name: "school_id" })
    academic_years: AcademicYear[]; // For reference only, not an actual colum'n
}