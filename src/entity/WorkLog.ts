import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class WorkLog {

    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(type => User, (user: User) => user.workLogs)
    user: User;
    
    @Column({
        nullable: false
    })
    work: string;


    @Column({
        nullable: false
    })
    start: Date;


    @Column({
        nullable: false
    })
    stop: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    modifiedAt: Date;

}
