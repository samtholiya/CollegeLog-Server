import { Router, Request, Response } from "express";
import { RoleService } from "../../service/role.service";
import { Role } from "../../entity/Role";
import { ResponseService } from "../../service/respose.service";
import { AccessRightService } from "../../service/accessRight.service";
import { AccessRight } from "../../entity/AccessRight";
import { UpdateEvent, UpdateResult, DeleteResult } from "typeorm";

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    RoleService.getRoles()
        .then((value: Role[]) => {
            ResponseService.sendSuccessful(res, value);
        }).catch(reason => {
            ResponseService.sendOperationUnsuccessful(res, reason);
        });
});

router.post('/', async (req: Request, res: Response) => {
    if (req.body.accessRights instanceof Array) {
        console.log(req.body.accessRights)
        let accessRights: AccessRight[] = [];
        req.body.accessRights.forEach(async accessId => {
            let accessRight = await AccessRightService.getAccessRightsById(accessId);
            accessRights.push(accessRight);
        });
        req.body.accessRights = accessRights;
    }
    //ResponseService.sendCreateSuccessful(res, "");
    RoleService.saveRole(req.body)
        .then((value: Role) => {
            ResponseService.sendCreateSuccessful(res, value);
        }).catch(reason => {
            ResponseService.sendOperationUnsuccessful(res, reason);
        });
});

router.put('/:roleId', async (req: Request, res: Response) => {
    if (req.body.accessRights instanceof Array) {
        console.log(req.body.accessRights)
        let accessRights: AccessRight[] = [];
        req.body.accessRights.forEach(async accessId => {
            let accessRight = await AccessRightService.getAccessRightsById(accessId);
            accessRights.push(accessRight);
        });
        req.body.accessRights = accessRights;
    }
    RoleService.updateRoleById(req.params.roleId, req.body)
        .then((value: UpdateResult) => {
            ResponseService.sendUpdateSuccessful(res, value);
        }).catch(reason => {
            ResponseService.sendOperationUnsuccessful(res, reason);
        });
})

router.delete('/:roleId', async (req: Request, res: Response) => {
    RoleService.deleteRoleById(req.params.roleId)
        .then((value: DeleteResult) => {
            ResponseService.sendUpdateSuccessful(res, value);
        }).catch(reason => {
            ResponseService.sendOperationUnsuccessful(res, reason);
        });
})
export const RoleApi: Router = router;
