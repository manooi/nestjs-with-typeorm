import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, PrimaryColumn, ManyToMany, JoinTable, OneToOne, OneToMany, Unique } from 'typeorm';
import { School } from '../school/school.entity';

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
}