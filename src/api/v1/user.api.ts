import { Router, Request, Response } from 'express';
import * as basicAuth from 'express-basic-auth';
import { User } from '../../entity/User';
import { UpdateResult, DeleteResult } from 'typeorm';
import { UserService } from '../../service/user.service';
import { ResponseService } from '../../service/respose.service';
import { DepartmentService } from '../../service/department.service';
import { Department } from '../../entity/Department';

const router: Router = Router();

router.get('/', (req: basicAuth.IBasicAuthedRequest, res: Response) => {
    UserService.getUserByUserName(req.auth.user)
        .then((value: User) => {
            value.password = 'secret';
            ResponseService.sendSuccessful(res, value);
        }).catch(reason => {
            ResponseService.sendOperationUnsuccessful(res, reason);
        });
});

router.get('/count', (req: Request, res: Response) => {
    UserService.getUsersCount(req.query.roleType)
        .then((count: number) => {
            ResponseService.sendSuccessful(res, { count });
        }).catch((reason) => {
            ResponseService.sendOperationUnsuccessful(res, reason);
        })
})

router.get('/list', (req: Request, res: Response) => {

    if (!(req.query.offset && req.query.limit && req.query.roleType)) {
        ResponseService.sendParamsRequired(res, { "required_query_params": ["roleType", "offset", "limit"] })
        return;
    }

    if (req.query.roleType == "all") {
        UserService.getUsers(req.query.offset, req.query.limit).then((value: User[]) => {
            for (let i = 0; i < value.length; i++) {
                value[i].password = 'secret';
            }
            ResponseService.sendSuccessful(res, value);
        }).catch(reason => {
            ResponseService.sendOperationUnsuccessful(res, reason);
        });
    } else {
        UserService.getUsersByType(req.query.roleType, req.query.offset, req.query.limit)
            .then((value: User[]) => {
                for (let i = 0; i < value.length; i++) {
                    value[i].password = 'secret';
                }
                ResponseService.sendSuccessful(res, value);
            }).catch(reason => {
                ResponseService.sendOperationUnsuccessful(res, reason);
            });
    }
});

router.get('/admin/:userId', (req: Request, res: Response) => {
    UserService.getUserById(req.params.userId)
        .then((value: User) => {
            value.password = 'secret';
            ResponseService.sendSuccessful(res, value);
        }).catch(reason => {
            ResponseService.sendOperationUnsuccessful(res, reason);
        });
});

router.delete('/:userId', (req: Request, res: Response) => {
    UserService.deleteUserById(req.params.userId)
        .then((value: DeleteResult) => {
            ResponseService.sendSuccessful(res, value);
        }).catch(reason => {
            ResponseService.sendOperationUnsuccessful(res, reason);
        });
});


router.post('/', (req: Request, res: Response) => {
    let obj: User = req.body;
    obj.isActive = true;
    UserService.saveUser(obj)
        .catch(reason => {
            ResponseService.sendOperationUnsuccessful(res, reason);
        }).then((value: User) => {
            ResponseService.sendCreateSuccessful(res, value);
        });
});

router.put('/:userId', (req: basicAuth.IBasicAuthedRequest, res: Response) => {
    let updatedUser: User = req.body;
    UserService.getUserById(req.params.userId)
        .then((value: User) => {
            UserService.updateUserById(updatedUser)
                .catch(reason => {
                    ResponseService.sendOperationUnsuccessful(res, reason);
                }).then((value: User) => {
                    ResponseService.sendCreateSuccessful(res, value);
                });

        }).catch(reason => {
            ResponseService.sendOperationUnsuccessful(res, reason);
        });
});


router.put('/', (req: basicAuth.IBasicAuthedRequest, res: Response) => {

    let updatedUser: User = req.body;
    //TODO: Restrict Admin update
    if (updatedUser.id) {
        UserService.updateUserById(updatedUser)
            .catch(reason => {
                ResponseService.sendOperationUnsuccessful(res, reason);
            }).then((value: User) => {
                ResponseService.sendCreateSuccessful(res, value);
            });
    } else {
        UserService.getUserByUserName(req.auth.user)
            .then((value: User) => {
                UserService.updateUserById(updatedUser)
                    .catch(reason => {
                        ResponseService.sendOperationUnsuccessful(res, reason);
                    }).then((value1: User) => {
                        ResponseService.sendCreateSuccessful(res, value1);
                    });
            }).catch(reason => {
                ResponseService.sendOperationUnsuccessful(res, reason);
            });
    }
});

export const UserApi: Router = router;