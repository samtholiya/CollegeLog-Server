import { IServicePanel } from "../namespace/initializer";
import { Connection, Repository } from "typeorm";
import { Student } from "../entity/Student";
import { DatabaseService } from "./database.service";

@IServicePanel.register
export class StudentService {
    private static connection: Connection;
    private static repository: Repository<Student>;

    public init(): void {
        StudentService.connection = DatabaseService.getDatabaseConnection();
        StudentService.repository = StudentService.connection.getRepository(Student);
    }

    public static saveStudent(role: Student): Promise<Student> {
        return this.repository.save(role);
    }

    public static getStudents(): Promise<Student[]> {
        return this.repository.find();
    }

}