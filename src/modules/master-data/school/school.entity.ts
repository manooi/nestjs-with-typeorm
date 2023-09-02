import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'mst_school' })
export class Subject {
    @PrimaryGeneratedColumn()
    school_id: number;

    @Column({ length: 250 })
    school_name: string;

    @Column({ length: 100, nullable: true })
    description: string;
}