import { Router } from "express";
import { Response, Request } from "express-serve-static-core";
import * as basicAuth from 'express-basic-auth';
import { WorkLogService } from "../../service/worklog.service";
import { UserService } from "../../service/user.service";
import { User } from "../../entity/User";
import { WorkLog } from "../../entity/WorkLog";
import { ResponseService } from "../../service/respose.service";

const router: Router = Router();

router.get('/', (req: basicAuth.IBasicAuthedRequest, res: Response) => {
    UserService.getUserByUserName(req.auth.user)
        .then((user: User) => {
            WorkLogService.getWorkLogsForUser(user.id, req.query.fromDate, req.query.toDate)
                .then((workLogs: WorkLog[]) => {
                    ResponseService.sendSuccessful(res, workLogs);
                })
                .catch((reason) => {
                    ResponseService.sendOperationUnsuccessful(res, reason);
                })
        })
        .catch((reason) => {
            ResponseService.sendOperationUnsuccessful(res, reason);
        })
});

router.get('/admin/:userId', (req: basicAuth.IBasicAuthedRequest, res: Response) => {
    UserService.getUserById(req.params.userId)
        .then((user: User) => {
            WorkLogService.getWorkLogsForUser(user.id, req.query.fromDate, req.query.toDate)
                .then((workLogs: WorkLog[]) => {
                    ResponseService.sendSuccessful(res, workLogs);
                })
                .catch((reason) => {
                    ResponseService.sendOperationUnsuccessful(res, reason);
                })
        })
        .catch((reason) => {
            ResponseService.sendOperationUnsuccessful(res, reason);
        })
});

router.post('/', (req: basicAuth.IBasicAuthedRequest, res: Response) => {

    UserService.getUserByUserName(req.auth.user)
        .then((user: User) => {
            let workLog: WorkLog = req.body;
            workLog.user = user;
            WorkLogService.saveWorkLog(workLog)
                .then((work: WorkLog) => {
                    ResponseService.sendCreateSuccessful(res, workLog);
                })
                .catch(reason => {
                    ResponseService.sendOperationUnsuccessful(res, reason);
                })
        })
        .catch((reason) => {
            ResponseService.sendOperationUnsuccessful(res, reason);
        })
});


export const WorkLogApi: Router = router;
