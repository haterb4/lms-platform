import { Request, Response, Router } from "express";
import StreamingRouter from "./streaming.routes";
import log from "../../../config/Logger";

class AppRouter {
    private _router: Router;

    constructor(){
        this._router = Router()
        this._router.get('', this.welcome);
        this._router.get('/healthcheck', this.healthcheck);
        
        const router: StreamingRouter = new StreamingRouter()
        this._router.use(router.router)
    }
    
    healthcheck(req: Request, res: Response){
        return res.sendStatus(200)
    }

    welcome(req: Request, res: Response){
        return res.status(200).send({
            success: true,
            message: "video streaming service is working well"
        })
    }

    get router(): Router {
        return this._router
    }
}

export default AppRouter