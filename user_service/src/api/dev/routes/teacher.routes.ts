import { Request, Response, Router } from 'express'
import requireUser from '../middlewares/requireUser';
import { asyncHandler } from '../helpers/asyncHandler';
import TeacherController from '../controllers/teacher.controller';
import validateRequestFields from '../middlewares/validateRequestFields';
import { CreateTeacherRequiredFieds } from '../schemas/teacher.schema';

class TeacherRouter {
    private _router: Router
    private _teacherControler: TeacherController;
    static teacherPrefix: string = "/api/dev/users/teachers";

    constructor(){
        this._router = Router();
        this._teacherControler = new TeacherController()
        this.bindRoutes();
        this._router.get(`${TeacherRouter.teacherPrefix}/check`, this.healthcheck)
    }

    bindRoutes(){
        //create
        this.router.post(TeacherRouter.teacherPrefix, validateRequestFields(CreateTeacherRequiredFieds), requireUser, asyncHandler(this._teacherControler.createUserHandler));
        //update
        this.router.put(TeacherRouter.teacherPrefix+'/:id', requireUser, asyncHandler(this._teacherControler.updateUserHandler));
        //delete
        this.router.delete(TeacherRouter.teacherPrefix+'/:id', requireUser, asyncHandler(this._teacherControler.deleteUserHandler));
        //get single
        this.router.get(TeacherRouter.teacherPrefix+'/:id', requireUser, asyncHandler(this._teacherControler.getUserHandler));
        //get many
        this.router.get(TeacherRouter.teacherPrefix, requireUser, asyncHandler(this._teacherControler.getTeacherHandler));
        //custom
        
    }
    healthcheck(req: Request, res: Response){
        return res.sendStatus(200)
    }

    get router(): Router {
        return this._router;
    }
}

export default TeacherRouter