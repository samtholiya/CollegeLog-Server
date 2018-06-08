import { IServicePanel } from "../namespace/initializer";
import { Response } from "express-serve-static-core";

@IServicePanel.register
export class ResponseService {

    public init() { }
    public static sendSuccessful(res: Response, data: any) {
        res.send(data);
    }
    public static sendCreateSuccessful(res: Response, data: any) {
        res.status(201);
        res.send(data);
    }

    public static sendUpdateSuccessful(res: Response, data: any) {
        res.status(203);
        res.send(data);
    }

    public static sendOperationUnsuccessful(res: Response, data: any) {
        res.status(400);
        res.send(data);
    }
}