import { Router } from "express";
import { UserApi } from "./user.api";
import { DepartmentApi } from "./department.api";
import { WorkLogApi } from "./worklog.api";
import { RoleApi } from "./role.api";
import { AccessRightApi } from "./accessRight.api";
import { StudentApi } from "./student.api";
import { SchoolApi } from "./school.api";

const router: Router = Router();

router.use('/user', UserApi);
router.use('/department', DepartmentApi);
router.use('/worklog', WorkLogApi);
router.use('/role', RoleApi);
router.use('/accessRight', AccessRightApi);
router.use('/student', StudentApi);
router.use('/school', SchoolApi);

export const v1Api: Router = router;
