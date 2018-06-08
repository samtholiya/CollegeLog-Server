// import { Router, Request, Response } from 'express';
// import * as basicAuth from 'express-basic-auth';
// import { getDatabaseConnection } from '../service/database';
// import { User } from '../entity/User';
// import { UpdateResult } from 'typeorm';

// const router: Router = Router();

// router.get('/', (req: Request, res: Response) => {
//     let connection = getDatabaseConnection();
//     let userRepository = connection.getRepository(User);
//     let obj: User = req.body;
//     obj.isActive = false;
//     obj.isAdmin = false;
//     console.log(obj.dateOfBirth);
//     userRepository.save(obj)
//         .catch(reason => {
//             res.status(400);
//             res.send(reason);
//         }).then((value: User) => {
//             res.status(201);
//             res.send(value);
//         }, reason => {
//             res.status(400);
//             res.send(reason);
//         });
// });

// router.post('/admin', (req: Request, res: Response) => {
//     let connection = getDatabaseConnection();
//     let userRepository = connection.getRepository(User);
//     let obj: User = req.body;
//     userRepository.save(obj)
//         .catch(reason => {
//             res.status(400);
//             res.send(reason);
//         }).then((value: User) => {
//             res.status(201);
//             res.send(value);
//         }, reason => {
//             res.status(400);
//             res.send(reason);
//         });
// });

// router.put('/', (req: basicAuth.IBasicAuthedRequest, res: Response) => {

//     let connection = getDatabaseConnection();
//     let userRepository = connection.getRepository(User);
//     userRepository.createQueryBuilder("user")
//         .where("user.username=:keyword")
//         .setParameter("keyword", req.auth.user)
//         .getOne().then((value: User) => {
//             let updatedUser: User = req.body;
//             userRepository.update(value.id, updatedUser)
//             .then((value: UpdateResult)=>{
//                 res.send(value);
//             }).catch((reason)=>{
//                 res.status(400);
//                 res.send(reason);
//             });
//             // if(updatedUser.address){
//             //     value.address = updatedUser.address;
//             // }
//             // if(updatedUser.dateOfBirth){
//             //     value.dateOfBirth = updatedUser.dateOfBirth;
//             // }
//             // if(updatedUser.department){
//             //     value.department = updatedUser.department;
//             // }
//             // if(updatedUser.password){
//             //     value.password = updatedUser.password;
//             // }
//             // if(updatedUser.mobile){
//             //     value.mobile = updatedUser.mobile;
//             // }
//             // if(updatedUser.firstName){
//             //     value.firstName = updatedUser.firstName;
//             // }
//             // if(updatedUser.lastName){
//             //     value.lastName = updatedUser.lastName;
//             // }

//         }).catch(reason=>{
//             res.status(400);
//             res.send(reason);
//         })
// });
// export const RegisterController: Router = router;