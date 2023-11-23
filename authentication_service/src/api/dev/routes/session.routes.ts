import { Request, Response, Router } from 'express'
import validateRessource from '../middlewares/validateResource';
import SessionController from '../controllers/session.controller';
import requireUser from '../middlewares/requireUser';
import { createSessionSchema } from '../schemas/session.schema';
import { asyncHandler } from '../helpers/asyncHandler';

class SessionRouter {
    private _router: Router
    private _controller: SessionController;
    static prefix: string = "/api/dev/sessions";

    constructor(){
        this._router = Router();
        this._controller = new SessionController()
        this.bindRoutes();
        this._router.get(`${SessionRouter.prefix}/check`, this.healthcheck)
    }

    bindRoutes(){
        this.router.post(SessionRouter.prefix, validateRessource(createSessionSchema), asyncHandler(this._controller.createUserSessionHandler));
        this.router.get(SessionRouter.prefix, requireUser, asyncHandler(this._controller.getUserSessionsHandler));
        this.router.post(SessionRouter.prefix+'/refresh', asyncHandler(this._controller.refreshUserSessionsHandler));
        this.router.delete(SessionRouter.prefix, requireUser, asyncHandler(this._controller.deleteSessionHandler));
    }
    healthcheck(req: Request, res: Response){
        return res.sendStatus(200)
    }

    get router(): Router {
        return this._router;
    }
}

export default SessionRouter