import { DatabaseService } from "./database.service";
import { User } from "../entity/User";
import { UpdateResult, Connection, Repository, DeleteResult } from "typeorm";
import { IServicePanel } from '../namespace/initializer'
@IServicePanel.register
export class UserService {
    private static connection: Connection;
    private static repository: Repository<User>;

    public init(): void {
        UserService.connection = DatabaseService.getDatabaseConnection();
        UserService.repository = UserService.connection.getRepository(User);
    }

    public static getUsers(): Promise<User[]> {
        return this.repository.createQueryBuilder("user")
            .leftJoinAndSelect("user.departments", "department")
            .leftJoinAndSelect("user.role", "role")
            .getMany();
    }

    public static getUsersByType(type: string): Promise<User[]> {
        return this.repository.createQueryBuilder("user")
            .leftJoinAndSelect("user.departments", "department")
            .leftJoinAndSelect("user.role", "role")
            .where("role.name=:keyword")
            .setParameter("keyword", type)
            .getMany();
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

    public static updateUserById(id: number, updatedUser: User): Promise<UpdateResult> {
        return this.repository.update(id, updatedUser);
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