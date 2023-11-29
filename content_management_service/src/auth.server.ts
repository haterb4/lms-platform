import express, { Express, NextFunction, Request, Response} from 'express'
import config from 'config'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import connectToDb from './config/DataBaseConfiguration'
import log from './config/Logger'
import deserializeUser from './api/dev/middlewares/deserializeUser'
import { errorHandler } from './api/dev/helpers/errorHandler'
import AppRouter from './api/dev/routes'


class AuthServer {
    private corsOptions = {
        origin:'*', 
        credentials: false,            //access-control-allow-credentials:true
        optionSuccessStatus:200,
    }
    private port: number;
    private app: Express;

    constructor(app: Express){
        this.app = app;
        this.initialize();
    }

    initialize(): void {
        this.app.use(cors(this.corsOptions));
        this.app.use(express.json());
        this.app.use(cookieParser())
        this.app.use(deserializeUser);

        //routing
        const appRouter:AppRouter = new AppRouter();
        this.app.use(appRouter.router);

        this.app.use(errorHandler);
        this.port = config.get<number>('port')

        this.app.all('*', (req: Request, res: Response, next: NextFunction) => {
            const err = new Error(`Route ${req.originalUrl} not found`) as any;
            err.statusCode = 404;
            next(err);
        })
        this.app.on("TokenExpiredError", (e) => {
            log.info("token error")
        })
    }

    public start(): void {
        this.app.listen(this.port, async () => {
            log.info(`App started at http://localhost:${this.port}`);
            //await connectToDb()
        })
    }
}

export default AuthServer