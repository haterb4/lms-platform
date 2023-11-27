import { Request, Response, Router } from 'express'
import requireUser from '../middlewares/requireUser';
import { asyncHandler } from '../helpers/asyncHandler';
import StudentController from '../controllers/stream.controller';
import validateRequestFields from '../middlewares/validateRequestFields';
import { CreateStudentRequiredFieds, UpdateStudentRequiredFields } from '../schemas/student.schema';
import StreamController from '../controllers/stream.controller';

class StreamingRouter {
    private _router: Router
    private _controller: StreamController;
    static studentPrefix: string = "/api/dev/users/students";

    constructor(){
        this._router = Router();
        this._controller = new StreamController()
        this.bindRoutes();
        this._router.get(`${StreamingRouter.studentPrefix}/check`, this.healthcheck)
    }

    bindRoutes(){
        //create
        this.router.get(StreamingRouter.studentPrefix+'/:id', validateRequestFields(UpdateStudentRequiredFields), requireUser, asyncHandler(this._controller.getVideoStreamHandler));
        //custom
        
    }
    healthcheck(req: Request, res: Response){
        return res.sendStatus(200)
    }

    get router(): Router {
        return this._router;
    }
}

export default StreamingRouter