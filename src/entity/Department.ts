import { Entity, PrimaryGeneratedColumn, Column, ColumnOptions, OneToMany, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { User } from "./User";
import { School } from "./School";

@Entity()
export class Department {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false
    })
    name: string;

    @ManyToOne(type => School, (school: School) => school.departments)
    school: School

    @ManyToMany(type => User, (user: User) => user.departments)
    users: User[];
}