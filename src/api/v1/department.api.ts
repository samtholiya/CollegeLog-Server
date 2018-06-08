import { Router } from "express";
import { Response, Request } from "express-serve-static-core";
import * as basicAuth from 'express-basic-auth';
import { Department } from "../../entity/Department";
import { DatabaseService } from "../../service/database.service";
import { DepartmentService } from "../../service/department.service";
import { ResponseService } from "../../service/respose.service";
import { DeleteResult } from "typeorm";

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    DepartmentService.getDepartments()
        .then((values: Department[]) => {
            ResponseService.sendSuccessful(res, values);
        })
        .catch(reason => {
            ResponseService.sendOperationUnsuccessful(res, reason);
        });
});

router.post('/', (req: Request, res: Response) => {

    DepartmentService.saveDepartment(req.body)
        .then((value: Department) => {
            ResponseService.sendCreateSuccessful(res, value);
        }).catch(reason => {
            ResponseService.sendOperationUnsuccessful(res, reason);
        });
});

router.delete('/:depId', (req: Request, res: Response) => {
    
    DepartmentService.deleteDepartmentById(req.params.depId)
        .then((value: DeleteResult) => {
            ResponseService.sendCreateSuccessful(res, value);
        }).catch(reason => {
            ResponseService.sendOperationUnsuccessful(res, reason);
        });
})

export const DepartmentApi: Router = router;
