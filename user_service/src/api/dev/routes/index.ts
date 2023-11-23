import { Request, Response, Router } from "express";
import StudentRouter from "./student.routes";
import TeacherRouter from "./teacher.routes";
import log from "../../../config/Logger";
import TeacherService from "../services/teacher.service";
import StudentService from "../services/student.service";
import ServiceFactory from "../services/service.factory";
import requireUser from "../middlewares/requireUser";
import { asyncHandler } from "../helpers/asyncHandler";

class AppRouter {
    private _router: Router;

    constructor(){
        this._router = Router()
        this._router.get('', this.welcome);
        this._router.get('/healthcheck', this.healthcheck);
        this._router.post('/api/dev/users/edit-preferences', requireUser, asyncHandler(this.editPreferences));
        
        const userRouter: StudentRouter = new StudentRouter()
        const teacherRouter: TeacherRouter = new TeacherRouter()
        this._router.use(userRouter.router)
        this._router.use(teacherRouter.router)
    }
    
    healthcheck(req: Request, res: Response){
        return res.sendStatus(200)
    }

    welcome(req: Request, res: Response){
        return res.status(200).send({
            success: true,
            message: "user management service is working well"
        })
    }


    public async editPreferences(req: Request, res: Response) {
        try {
            const { id, role, preferences } = req.body;
            const isTeacher = role === "teacher";
            const _service: TeacherService | StudentService = isTeacher ? <TeacherService>ServiceFactory.create('teacher') : <StudentService>ServiceFactory.create('student');

            const isUserExists = _service.findOne({ _id: id});

            if(!isUserExists){
                log.info("user not found");
                return res.status(403).send({
                    success: false,
                    message: "Unauthorized action"
                });
            }

            await _service.update(id, preferences);
            return res.status(200).send({ success: true});
        } catch (e: any) {
            log.error(e.message);
            return res.status(409).send(e.message);
        }
    }

    get router(): Router {
        return this._router
    }
}

export default AppRouter