import { Request, Response, Router } from 'express'
import validateRessource from '../middlewares/validateResource';
import requireUser from '../middlewares/requireUser';
import CourseController from '../controllers/course.controller';
import { asyncHandler } from '../helpers/asyncHandler';

class CourseRouter {
    private _router: Router
    private _controller: CourseController;
    static prefix: string = "/api/dev/sessions";

    constructor(){
        this._router = Router();
        this._controller = new CourseController()
        this.bindRoutes();
        this._router.get(`${CourseRouter.prefix}/check`, this.healthcheck)
    }

    bindRoutes(){
        this.router.post(CourseRouter.prefix, asyncHandler(this._controller.createUserSessionHandler));
    }
    healthcheck(req: Request, res: Response){
        return res.sendStatus(200)
    }

    get router(): Router {
        return this._router;
    }
}

export default CourseRouter