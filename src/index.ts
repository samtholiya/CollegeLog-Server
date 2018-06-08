import "reflect-metadata";
import { createConnection, Connection } from "typeorm";
import { User } from "./entity/User";
import * as express from 'express';
import * as basicAuth from 'express-basic-auth'
import { WelcomeController } from './controllers';
import { isAuthorizedAsync, isAdminAuthorizedAsync } from './middleware/authorization'
import * as bodyParser from 'body-parser'
import { Md5 } from "md5-typescript";
import { Api } from "./api";
import { IServicePanel } from "./namespace/initializer";
import { DatabaseService } from "./service/database.service";
import { Role } from "./entity/Role";
import { AccessRight } from "./entity/AccessRight";


console.log(Md5.init('root'));
const app: express.Application = express();
const port: number = Number(process.env.PORT) || 3000;


app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log(req.url);
    next();
});

app.use('/welcome', WelcomeController);
app.use(basicAuth({
    authorizeAsync: true,
    authorizer: isAuthorizedAsync,
}), isAdminAuthorizedAsync)

//app.use('/register', RegisterController);
app.use('/api', Api);

console.log("Connecting to Database");
DatabaseService.connectDatabase()
    .then((connection: Connection) => {
        
        console.info("Database connected");
        console.info('Initializing services');
        var servicePanels = IServicePanel.GetImplementations();
        for (var x = 0; x < servicePanels.length; x++) {
            console.info('Initializing ' + servicePanels[x].name);
            let panel = new servicePanels[x]();
            panel.init();
        }
        console.info('Initialization complete');

        app.listen(port, '0.0.0.0', () => {
            console.log(`Listening at http://localhost:${port}/`);
        });

    }).catch(reason=>{
        console.log(reason);
    })


// createConnection().then(async connection => {

//     console.log("Inserting a new user into the database...");
//     const user = new User();
//     user.firstName = "Timber";
//     user.lastName = "Saw";
//     //user.age = 25;
//     await connection.manager.save(user);
//     console.log("Saved a new user with id: " + user.id);

//     console.log("Loading users from the database...");
//     const users = await connection.manager.find(User);
//     console.log("Loaded users: ", users);

//     console.log("Here you can setup and run express/koa/any other framework.");

// }).catch(error => console.log(error));
