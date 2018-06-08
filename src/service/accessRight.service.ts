import { IServicePanel } from "../namespace/initializer";
import { Connection, Repository } from "typeorm";
import { Department } from "../entity/Department";
import { DatabaseService } from "./database.service";
import { AccessRight } from "../entity/AccessRight";
import { IHash } from "../namespace/hashmap";
import { Role } from "../entity/Role";

@IServicePanel.register
export class AccessRightService {

    private static connection: Connection;
    private static repository: Repository<AccessRight>;
    private static roles: IHash<Role>

    public init() {
        AccessRightService.connection = DatabaseService.getDatabaseConnection();
        AccessRightService.repository = AccessRightService.connection.getRepository(AccessRight);
    }

    public static getAccessRights(): Promise<AccessRight[]> {
        return AccessRightService.repository.createQueryBuilder("access")
            .leftJoinAndSelect("access.roles", "role").getMany();
    }

    public static getAccessRightsById(id: number): Promise<AccessRight> {
        return AccessRightService.repository.createQueryBuilder("access")
            .leftJoinAndSelect("access.roles", "role")
            .where("access.id =:key", { key: id })
            .getOne();
    }
    public static saveAccessRight(accessRight: AccessRight): Promise<AccessRight> {
        return AccessRightService.repository.save(accessRight);
    }


}
