import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'mst_academic_year' })
export class AcademicYear {
    @PrimaryGeneratedColumn()
    academic_year_id: number;

    @Column({ length: 10 })
    academic_year_name: string; // e.g. 1/2565

    @Column({ length: 255, nullable: true })
    description: string;

    @Column()
    is_active: boolean;
}