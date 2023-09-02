import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, PrimaryColumn, ManyToMany, JoinTable, OneToOne, OneToMany, Unique } from 'typeorm';

@Entity({ name: 'mst_classroom' })
export class ClassRoom {
    @PrimaryGeneratedColumn()
    classroom_id: number;

    @Column({ length: 100 })
    classroom_name: string;

    @Column({ length: 100, nullable: true})
    description: string;
}