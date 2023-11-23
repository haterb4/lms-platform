import { Request, Response, Router } from 'express'
import UserController from '../controllers/user.controller';
import { createUserSchema, forgotPasswordSchema, resetPasswordSchema, subscribeRolesSchema, verifyUserSchema } from '../schemas/user.schema';
import validateRessource from '../middlewares/validateResource';
import { asyncHandler } from '../helpers/asyncHandler';
import requireUser from '../middlewares/requireUser';

class UserRouter {
    private _router: Router
    private _controller: UserController;
    static prefix: string = "/api/dev/users";

    constructor(){
        this._router = Router();
        this._controller = new UserController()
        this._router.get(`${UserRouter.prefix}/check`, this.healthcheck)
        this.bindRoutes();
    }

    bindRoutes(){
        this.router.post(UserRouter.prefix, validateRessource(createUserSchema), asyncHandler(this._controller.createUserHandler));
        this.router.get(UserRouter.prefix+'/:id/:code', validateRessource(verifyUserSchema), asyncHandler(this._controller.verifyUserHandler));
        this.router.post(UserRouter.prefix+'/password', validateRessource(forgotPasswordSchema), asyncHandler(this._controller.forgotPasswordHandler));
        this.router.post(UserRouter.prefix+'/password/:id/:code', validateRessource(resetPasswordSchema), asyncHandler(this._controller.resetPasswordHandler));
        this.router.post(UserRouter.prefix+'/roles', validateRessource(subscribeRolesSchema), requireUser, asyncHandler(this._controller.subscribeRolesHandler));
        this.router.get(UserRouter.prefix, requireUser, asyncHandler(this._controller.getCurentUserHandler));
    }
    healthcheck(req: Request, res: Response){
        return res.sendStatus(200)
    }

    get router(): Router {
        return this._router;
    }
}

export default UserRouter