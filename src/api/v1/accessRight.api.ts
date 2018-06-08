import { Router, Request, Response } from "express";
import { RoleService } from "../../service/role.service";
import { Role } from "../../entity/Role";
import { ResponseService } from "../../service/respose.service";
import { AccessRightService } from "../../service/accessRight.service";
import { AccessRight } from "../../entity/AccessRight";

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    AccessRightService.getAccessRights()
        .then((value: AccessRight[]) => {
            ResponseService.sendSuccessful(res, value);
        }).catch(reason => {
            ResponseService.sendOperationUnsuccessful(res, reason);
        });
});

router.post('/', (req: Request, res: Response) => {
    AccessRightService.saveAccessRight(req.body)
        .then((value: AccessRight) => {
            ResponseService.sendCreateSuccessful(res, value);
        }).catch(reason => {
            ResponseService.sendOperationUnsuccessful(res, reason);
        });
});


export const AccessRightApi: Router = router;