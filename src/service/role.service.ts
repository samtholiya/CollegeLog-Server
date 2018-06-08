import { Connection, Repository, UpdateResult, DeleteResult } from "typeorm";
import { IServicePanel } from "../namespace/initializer";
import { Role } from "../entity/Role";
import { IHash } from "../namespace/hashmap";
import { DatabaseService } from "./database.service";
import { AccessRight } from "../entity/AccessRight";

@IServicePanel.register
export class RoleService {


    private static connection: Connection;
    private static repository: Repository<Role>;
    private static roles: IHash<Role>

    public init() {
        RoleService.roles = {};
        RoleService.connection = DatabaseService.getDatabaseConnection();
        RoleService.repository = RoleService.connection.getRepository(Role);
        RoleService.getLiveAccessRights();
    }

    public static getAccessRightsForRole(roleName: string): AccessRight[] {
        return this.roles[roleName].accessRights;
    }

    public static getLiveAccessRights(): Promise<Role[]> {
        let rights = this.repository.createQueryBuilder("role")
            .leftJoinAndSelect("role.accessRights", "accessRight").getMany();
        let rights1: Promise<Role[]> = rights.then();
        rights.then((roles: Role[]) => {
            roles.forEach((role: Role) => {
                this.roles[role.name] = role;
            })
        });
        return rights1;
    }

    public static getRoles(): Promise<Role[]> {
        return this.repository.createQueryBuilder("role")
            .leftJoinAndSelect("role.accessRights", "accessRight").getMany();
    }

    public static saveRole(role: Role): Promise<Role> {
        let repoDo = this.repository.save(role);
        let repoSave: Promise<Role> = repoDo.then();
        repoDo
            .then((role: Role) => {
                this.getLiveAccessRights();
            })
            .catch(reason => {

            });
        return repoSave;
    }

    public static updateRoleById(id: number, role: Role): Promise<UpdateResult> {
        return this.repository.update(id, role);
    }

    public static deleteRoleById(id: number): Promise<DeleteResult> {
        return this.repository.createQueryBuilder("role")
            .where("role.id=:keyword")
            .setParameter("keyword", id)
            .delete().execute();
    }

    
}
