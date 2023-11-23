import { Request, Response, NextFunction } from "express";

const requireUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = res.locals.user.decoded
    
        if(!user){
            return res.sendStatus(403)
        }
    } catch (e: any) {
        return res.status(404).send(e.message+"\n verify your access token")
    }

    return next()
}

export default requireUser