import { School } from "../entity/School";
import { DatabaseService } from "./database.service";
import { Connection, Repository, DeleteResult, SelectQueryBuilder } from "typeorm";
import { IServicePanel } from "../namespace/initializer";

@IServicePanel.register
export class SchoolService {

    private static connection: Connection;
    private static repository: Repository<School>;

    public init(): void {
        SchoolService.connection = DatabaseService.getDatabaseConnection();
        SchoolService.repository = SchoolService.connection.getRepository(School);
    }

    public static saveSchool(school: School): Promise<School> {
        return this.repository.save(school);
    }

    public static getSchools(): Promise<School[]>;
    public static getSchools(offset: number, limit: number): Promise<School[]>;

    public static getSchools(offset?: number, limit?: number): Promise<School[]> {
        let queryBuilder: SelectQueryBuilder<School> = this.repository.createQueryBuilder("school")
            .leftJoinAndSelect("school.departments", "department");

        if (offset && limit) {
            queryBuilder = queryBuilder.offset(offset);
            queryBuilder = queryBuilder.limit(limit);
        }
        return queryBuilder.getMany();
    }

    public static deleteSchoolById(id: number): Promise<DeleteResult> {
        return this.repository.createQueryBuilder("school")
            .where("school.id=:keyword")
            .setParameter("keyword", id)
            .delete().execute();
    }
}