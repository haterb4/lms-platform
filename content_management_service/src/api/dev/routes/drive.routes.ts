import { Request, Response, Router } from 'express'
import requireUser from '../middlewares/requireUser';
import { asyncHandler } from '../helpers/asyncHandler';
import DriveController from '../controllers/drive.controller';
import upload from '../helpers/multer';

class DriveRouter {
    private _router: Router
    private _controller: DriveController;
    static prefix: string = "/api/dev/content";

    constructor(){
        this._router = Router();
        this._controller = new DriveController()
        this.bindRoutes();
        this._router.get(`${DriveRouter.prefix}/check`, this.healthcheck)
    }

    bindRoutes(){
        this.router.post(DriveRouter.prefix, requireUser, upload.single('video'), asyncHandler(this._controller.uploadFile));
    }
    healthcheck(req: Request, res: Response){
        return res.sendStatus(200)
    }

    get router(): Router {
        return this._router;
    }
}

export default DriveRouter