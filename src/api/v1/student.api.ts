import { Router, Request, Response } from "express";
import { ResponseService } from "../../service/respose.service";
import { StudentService } from "../../service/student.service";
import { Student } from "../../entity/Student";

const router: Router = Router();


router.post('/', (req: Request, res: Response) => {
    //ResponseService.sendCreateSuccessful(res, "");
    StudentService.saveStudent(req.body)
        .then((value: Student) => {
            ResponseService.sendCreateSuccessful(res, value);
        }).catch(reason => {
            ResponseService.sendOperationUnsuccessful(res, reason);
        });
});

router.get('/', (req: Request, res: Response) => {
    StudentService.getStudents().then((value: Student[]) => {
        ResponseService.sendSuccessful(res, value);
    }).catch(reason => {
        ResponseService.sendOperationUnsuccessful(res, reason);
    });
})

export const StudentApi: Router = router;
