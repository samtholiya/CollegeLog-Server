import { WorkLog } from "../entity/WorkLog";
import { IServicePanel } from "../namespace/initializer";
import { Connection, Repository, SelectQueryBuilder } from "typeorm";
import { DatabaseService } from "./database.service";

@IServicePanel.register
export class WorkLogService {

    private static connection: Connection;
    private static repository: Repository<WorkLog>;

    public init() {
        WorkLogService.connection = DatabaseService.getDatabaseConnection();
        WorkLogService.repository = WorkLogService.connection.getRepository(WorkLog);
    }

    public static saveWorkLog(work: WorkLog): Promise<WorkLog> {
        return this.repository.save(work);
    }


    public static getWorkLogsForUser(id: number): Promise<WorkLog[]>;
    public static getWorkLogsForUser(id: number, fromDate: Date, toDate: Date): Promise<WorkLog[]>;

    public static getWorkLogsForUser(id: number, fromDate?: Date, toDate?: Date): Promise<WorkLog[]> {
        let query: SelectQueryBuilder<WorkLog> =
            this.repository
                .createQueryBuilder("work")
                .where("work.userId=:keyword", { keyword: id });

        if (fromDate) {
            query.andWhere("work.start >= :start", { start: new Date(fromDate) });
        }
        
        if (toDate) {
            query.andWhere("work.start <= :end", { end: new Date(toDate) });
        }
        return query.getMany();
    }


}