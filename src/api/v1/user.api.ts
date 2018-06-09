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

router.get('/:roleType', (req: Request, res: Response) => {
    if (req.params.roleType == "all") {
        UserService.getUsers().then((value: User[]) => {
            for (let i = 0; i < value.length; i++) {
                value[i].password = 'secret';
            }
            ResponseService.sendSuccessful(res, value);
        }).catch(reason => {
            ResponseService.sendOperationUnsuccessful(res, reason);
        });
    } else {
        UserService.getUsersByType(req.params.roleType).then((value: User[]) => {
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

router.delete('/admin/:userId', (req: Request, res: Response) => {
    UserService.deleteUserById(req.params.userId)
        .then((value: DeleteResult) => {
            ResponseService.sendSuccessful(res, value);
        }).catch(reason => {
            ResponseService.sendOperationUnsuccessful(res, reason);
        });
});


router.post('/', (req: Request, res: Response) => {
    let obj: User = req.body;
    obj.isActive = false;
    UserService.saveUser(obj)
        .catch(reason => {
            ResponseService.sendOperationUnsuccessful(res, reason);
        }).then((value: User) => {
            ResponseService.sendCreateSuccessful(res, value);
        });
    // }
});

router.post('/admin', (req: Request, res: Response) => {
    let obj: User = req.body;
    UserService.saveUser(obj)
        .catch(reason => {
            ResponseService.sendOperationUnsuccessful(res, reason);
        }).then((value: User) => {
            ResponseService.sendCreateSuccessful(res, value);
        }, reason => {
            ResponseService.sendOperationUnsuccessful(res, reason);
        });
});

router.put('/admin', (req: basicAuth.IBasicAuthedRequest, res: Response) => {
    UserService.getUserByUserName(req.body.userName)
        .then((value: User) => {
            let updatedUser: User = req.body;
            UserService.updateUserById(value.id, updatedUser)
                .then((value: UpdateResult) => {
                    ResponseService.sendUpdateSuccessful(res, value);
                }).catch((reason) => {
                    ResponseService.sendOperationUnsuccessful(res, reason);
                });
        }).catch(reason => {
            ResponseService.sendOperationUnsuccessful(res, reason);
        })
});

router.put('/admin/:userId', (req: basicAuth.IBasicAuthedRequest, res: Response) => {
    let updatedUser: User = req.body;
    UserService.getUserById(req.params.userId)
        .then((value: User) => {
            if (updatedUser.departments) {
                DepartmentService.getDepartment(req.body.department)
                    .then((department: Department) => {
                        updatedUser.departments = [department];
                        UserService.updateUserById(value.id, updatedUser)
                            .catch(reason => {
                                ResponseService.sendOperationUnsuccessful(res, reason);
                            }).then((value: UpdateResult) => {
                                ResponseService.sendCreateSuccessful(res, value);
                            });
                    }).catch(reason => {
                        ResponseService.sendOperationUnsuccessful(res, reason);
                    })
            } else {
                UserService.updateUserById(value.id, updatedUser)
                    .then((value: UpdateResult) => {
                        ResponseService.sendUpdateSuccessful(res, value);
                    }).catch((reason) => {
                        ResponseService.sendOperationUnsuccessful(res, reason);
                    });
            }
        }).catch(reason => {
            ResponseService.sendOperationUnsuccessful(res, reason);
        });
});


router.put('/', (req: basicAuth.IBasicAuthedRequest, res: Response) => {

    let updatedUser: User = req.body;
    //TODO: Restrict Admin update

    UserService.getUserByUserName(req.auth.user)
        .then((value: User) => {
            if (req.body.department) {
                DepartmentService.getDepartment(req.body.department)
                    .then((department: Department) => {
                        updatedUser.departments = [department];
                        UserService.updateUserById(value.id, updatedUser)
                            .catch(reason => {
                                ResponseService.sendOperationUnsuccessful(res, reason);
                            }).then((value: UpdateResult) => {
                                ResponseService.sendCreateSuccessful(res, value);
                            });
                    }).catch(reason => {
                        ResponseService.sendOperationUnsuccessful(res, reason);
                    })

            } else {
                UserService.updateUserById(value.id, updatedUser)
                    .then((value: UpdateResult) => {
                        ResponseService.sendUpdateSuccessful(res, value);
                    }).catch((reason) => {
                        ResponseService.sendOperationUnsuccessful(res, reason);
                    });
            }
        }).catch(reason => {
            ResponseService.sendOperationUnsuccessful(res, reason);
        })
});

export const UserApi: Router = router;