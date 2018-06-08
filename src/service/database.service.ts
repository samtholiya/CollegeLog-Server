import { createConnection, Connection } from "typeorm";
import { IServicePanel } from "../namespace/initializer";


@IServicePanel.register
export class DatabaseService {
    private static db: Connection;
    public init() {
    }

    public static connectDatabase(): Promise<Connection> {
        let dbs: Promise<Connection> = createConnection();
        let dd: Promise<Connection> = dbs.then();
        dbs.then((connection:Connection)=>{
            this.db = connection;
        });
        return dd;
    }

    public static getDatabaseConnection(): Connection {
        return this.db;
    }

    public static setDatabaseConnection(connection: Connection) {
        this.db = connection;
    }
}