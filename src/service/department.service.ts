import { IServicePanel } from "../namespace/initializer";
import { Department } from "../entity/Department";
import { Repository, Connection, DeleteResult } from "typeorm";
import { DatabaseService } from "./database.service";

@IServicePanel.register
export class DepartmentService {

    private static connection: Connection;
    private static repository: Repository<Department>;

    public init() {
        DepartmentService.connection = DatabaseService.getDatabaseConnection();
        DepartmentService.repository = DepartmentService.connection.getRepository(Department);
    }

    public static getDepartments(): Promise<Department[]> {
        return this.repository
            .createQueryBuilder("dep")
            .leftJoinAndSelect("dep.school", "school")
            .getMany();
    }

    public static saveDepartment(department: Department): Promise<Department> {
        return this.repository.save(department);
    }

    public static getDepartment(name: string): Promise<Department> {
        return this.repository
            .createQueryBuilder("dep")
            .leftJoinAndSelect("dep.school", "school")
            .where("dep.name=:keyword")
            .setParameter("keyword", name)
            .getOne();
    }

    static deleteDepartmentById(id: number): Promise<DeleteResult> {
        return this.repository.createQueryBuilder("dep")
            .where("dep.id=:keyword")
            .setParameter("keyword", id)
            .delete().execute();
    }

}