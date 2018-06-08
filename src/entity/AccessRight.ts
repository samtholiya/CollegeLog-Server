import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinColumn } from "typeorm";
import { Role } from "./Role";


@Entity()
export class AccessRight {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false
    })
    name: string;

    @Column({
        nullable: false
    })
    method: string;

    @Column({
        nullable: false
    })
    apiEndpoint: string;
    
    @ManyToMany(type => Role, (role: Role) => role.accessRights)
    roles: Role[]

}