import { Request, Response, Router } from "express";
import UserRouter from "./user.routes";
import SessionRouter from "./session.routes";

class AppRouter {
    private _router: Router;

    constructor(){
        this._router = Router()
        this._router.get('/healthcheck', this.healthcheck);
        this._router.get('', this.welcome);
        
        const userRouter: UserRouter = new UserRouter()
        const sessionRouter: SessionRouter = new SessionRouter()
        this._router.use(userRouter.router)
        this._router.use(sessionRouter.router)
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