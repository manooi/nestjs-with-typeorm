import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { School } from '../school/school.entity';

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

    @ManyToOne(() => School, (a) => a.school_id, {
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    })
    @JoinColumn({ name: "school_id" })
    @Column()
    school_id: number;

    @ManyToOne(() => School, (a) => a.school_id)
    @JoinColumn({ name: "school_id" })
    school: School; // For reference only, not an actual column
}