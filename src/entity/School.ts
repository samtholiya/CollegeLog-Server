import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Department } from "./Department";



@Entity()
export class School {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false
    })
    name: string;

    @Column({
        nullable: false
    })
    address: string;

    @Column({
        nullable: false
    })
    city: string;

    @Column({
        nullable: true
    })
    url: string;

    @OneToMany(type => Department, (department: Department) => department.school, { cascade: true })
    departments: Department[]

}