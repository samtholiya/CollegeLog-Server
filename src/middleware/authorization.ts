import * as basicAuth from 'express-basic-auth'
import { User } from '../entity/User';
import { DatabaseService } from '../service/database.service';
import { Md5 } from 'md5-typescript';
import { Response } from 'express';
import { UserService } from '../service/user.service';
import { RoleService } from '../service/role.service';
import { AccessRight } from '../entity/AccessRight';

export function isAuthorizedAsync(username: string, password: string, next) {
    UserService.getUserByUserName(username).then((value: User) => {
        if (value == undefined) {
            console.log('No user found')
            next(null, false);
            return;
        }

        if (!value.isActive) {
            next("{\"message\":\"User is not active\"}", false)
            return;
        }

        if (value.password == Md5.init(password)) {
            next(null, true);
        } else {
            next("{\"message\":\"unauthorized\"}", false);
        }

    }, (reason: any) => {
        console.log(reason);
        next(null, false);
    }).catch((reason: any) => {
        console.log(reason);
        next(null, false);
    });
}

export function isAdminAuthorizedAsync(req: basicAuth.IBasicAuthedRequest, res: Response, next) {
    UserService.getUserByUserName(req.auth.user).then((value: User) => {
        let grantAccess = false;

        let accessRights = RoleService.getAccessRightsForRole(value.role.name);
        accessRights.forEach((accessRight: AccessRight) => {
            var regexp = new RegExp(accessRight.apiEndpoint);
            if (regexp.test(req.url) && accessRight.method == req.method) {
                grantAccess = true;
            }
        })
        if (grantAccess) {
            next();
        } else {
            res.status(403);
            res.send({ "message": "user is not authorized" });
        }
    }, (reason: any) => {
        console.log(reason);
        next(reason, false);
    }).catch((reason: any) => {
        console.log(reason);
        next(reason, false);
    });//next();

}
