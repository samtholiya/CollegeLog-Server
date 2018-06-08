import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinColumn, JoinTable } from "typeorm";
import { User } from "./User";
import { AccessRight } from "./AccessRight";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false
    })
    name: string;

    @OneToMany(type => User, (user: User) => user.role)
    users: User[];

    @ManyToMany(type => AccessRight, (access: AccessRight) => access.roles)
    @JoinTable()
    accessRights: AccessRight[]

}