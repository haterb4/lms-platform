import { Request, Response, Router } from "express";
import DriveRouter from "./drive.routes";

class AppRouter {
    private _router: Router;

    constructor(){
        this._router = Router()
        this._router.get('/healthcheck', this.healthcheck);
        this._router.get('', this.welcome);
        const driveRouter: DriveRouter = new DriveRouter()
        this._router.use(driveRouter.router)
    }
    
    healthcheck(req: Request, res: Response){
        return res.sendStatus(200)
    }

    welcome(req: Request, res: Response){
        return res.status(200).send({
            success: true,
            message: "Authentication service is working well"
        })
    }
    get router(): Router {
        return this._router
    }
}

export default AppRouter