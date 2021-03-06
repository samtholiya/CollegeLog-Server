import { DatabaseService } from "./database.service";
import { User } from "../entity/User";
import { UpdateResult, Connection, Repository, DeleteResult, SelectQueryBuilder } from "typeorm";
import { IServicePanel } from '../namespace/initializer'
import { json } from "express";
@IServicePanel.register
export class UserService {
    private static connection: Connection;
    private static repository: Repository<User>;

    public init(): void {
        UserService.connection = DatabaseService.getDatabaseConnection();
        UserService.repository = UserService.connection.getRepository(User);
    }

    public static getUsers(offset: number, limit: number): Promise<User[]> {
        return this.repository.createQueryBuilder("user")
            .leftJoinAndSelect("user.departments", "department")
            .leftJoinAndSelect("user.role", "role")
            .leftJoinAndSelect("department.school", "school")
            .offset(offset)
            .limit(limit)
            .getMany();
    }

    public static getUsersByType(type: string, offset: number, limit: number): Promise<User[]> {
        return this.repository.createQueryBuilder("user")
            .leftJoinAndSelect("user.departments", "department")
            .leftJoinAndSelect("user.role", "role")
            .leftJoinAndSelect("department.school","school")
            .where("role.name=:keyword")
            .setParameter("keyword", type)
            .offset(offset)
            .limit(limit)
            .getMany();
    }

    public static getUsersCount(type?: string): Promise<number> {
        let query: SelectQueryBuilder<User> = this.repository.createQueryBuilder("user");
        if (type && type != "all") {
            query = query.leftJoinAndSelect("user.role", "role")
                .where("role.name=:keyword")
                .setParameter("keyword", type)
        }
        return query.getCount();
    }

    public static getUserById(id: number): Promise<User> {
        return this.repository.createQueryBuilder("user")
            .leftJoinAndSelect("user.departments", "department")
            .leftJoinAndSelect("user.role", "role")
            .where("user.id=:keyword")
            .setParameter("keyword", id)
            .getOne();
    }

    public static getUserByUserName(username: string): Promise<User> {
        return this.repository.createQueryBuilder("user")
            .leftJoinAndSelect("user.departments", "department")
            .leftJoinAndSelect("user.role", "role")
            .where("user.username=:keyword")
            .setParameter("keyword", username)
            .getOne();
    }

    public static updateUserById(updatedUser: User): Promise<User> {
        return this.repository.save(updatedUser);
    }

    public static saveUser(user: User): Promise<User> {
        return this.repository.save(user);
    }

    public static deleteUserById(id: number): Promise<DeleteResult> {
        return this.repository.createQueryBuilder("user")
            .where("user.id=:keyword")
            .setParameter("keyword", id)
            .delete().execute();
    }

}