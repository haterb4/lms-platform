import { Request, Response, Router } from 'express'
import requireUser from '../middlewares/requireUser';
import { asyncHandler } from '../helpers/asyncHandler';
import StudentController from '../controllers/student.controller';
import validateRequestFields from '../middlewares/validateRequestFields';
import { CreateStudentRequiredFieds, UpdateStudentRequiredFields } from '../schemas/student.schema';

class StudentRouter {
    private _router: Router
    private _studentControler: StudentController;
    static studentPrefix: string = "/api/dev/users/students";

    constructor(){
        this._router = Router();
        this._studentControler = new StudentController()
        this.bindRoutes();
        this._router.get(`${StudentRouter.studentPrefix}/check`, this.healthcheck)
    }

    bindRoutes(){
        //create
        this.router.post(StudentRouter.studentPrefix, validateRequestFields(CreateStudentRequiredFieds), requireUser, asyncHandler(this._studentControler.createUserHandler));
        //update
        this.router.put(StudentRouter.studentPrefix+'/:id', validateRequestFields(UpdateStudentRequiredFields), requireUser, asyncHandler(this._studentControler.updateUserHandler));
        //delete
        this.router.delete(StudentRouter.studentPrefix+'/:id', requireUser, asyncHandler(this._studentControler.deleteUserHandler));
        //get single
        this.router.get(StudentRouter.studentPrefix+'/:id', requireUser, asyncHandler(this._studentControler.getUserHandler));
        //get many
        this.router.get(StudentRouter.studentPrefix, requireUser, asyncHandler(this._studentControler.getStudentHandler));
        //custom
        
    }
    healthcheck(req: Request, res: Response){
        return res.sendStatus(200)
    }

    get router(): Router {
        return this._router;
    }
}

export default StudentRouter