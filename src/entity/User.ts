import { Entity, PrimaryGeneratedColumn, Column, ColumnOptions, ManyToOne, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { PasswordTransformer } from "../helper/passwordTransformer";
import { WorkLog } from "./WorkLog";
import { Department } from "./Department";
import { Role } from "./Role";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false
    })
    firstName: string;

    @Column({
        nullable: false
    })
    lastName: string;

    @Column({
        nullable: false,
        unique: true
    })
    userName: string;

    @Column({
        transformer: new PasswordTransformer(),
        nullable: false
    })
    password: string;

    @Column({
        nullable: false
    })
    dateOfBirth: Date

    @Column({
        length: 13,
        nullable: false,
        unique: true
    })
    mobile: string;

    @Column({
        nullable: false,
        unique: true
    })
    email: string;

    @Column()
    address: string;

    @OneToMany(type => WorkLog, (workLog: WorkLog) => workLog.user)
    workLogs: WorkLog[];

    @ManyToMany(type => Department, (department: Department) => department.users)
    @JoinTable()
    departments: Department[]

    @ManyToOne(type => Role, (role: Role) => role.users)
    role: Role

    @Column({
        nullable: false
    })
    isActive: Boolean
}
