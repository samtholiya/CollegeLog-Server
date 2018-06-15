import { Router, Request, Response } from "express";
import { SchoolService } from "../../service/school.service";
import { School } from "../../entity/School";
import { ResponseService } from "../../service/respose.service";
import { DeleteResult } from "typeorm";


const router: Router = Router();

router.get('/list', (req: Request, res: Response) => {

    if (!(req.query.limit && req.query.limit)) {
        ResponseService.sendParamsRequired(res, { "required_query_params": ["offset", "limit"] })
        return;
    }

    SchoolService.getSchools(req.query.offset, req.query.limit)
        .then((values: School[]) => {
            ResponseService.sendSuccessful(res, values);
        })
        .catch(reason => {
            ResponseService.sendOperationUnsuccessful(res, reason);
        });
});


router.post('/', (req: Request, res: Response) => {
    SchoolService.saveSchool(req.body)
        .then((value: School) => {
            ResponseService.sendCreateSuccessful(res, value);
        }).catch(reason => {
            ResponseService.sendOperationUnsuccessful(res, reason);
        });
});

router.delete('/:depId', (req: Request, res: Response) => {

    SchoolService.deleteSchoolById(req.params.depId)
        .then((value: DeleteResult) => {
            ResponseService.sendCreateSuccessful(res, value);
        }).catch(reason => {
            ResponseService.sendOperationUnsuccessful(res, reason);
        });
})

export const SchoolApi: Router = router;