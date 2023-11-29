import { Request, Response, NextFunction } from "express";
import JWTHelper from "../helpers/jwt.helper";
import log from "../../../config/Logger";


const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = (req.headers.authorization || "").replace(
        /^Bearer\s/,
        ""
    )

    if(!accessToken){
        return next()
    }

    const jwtHelper: JWTHelper = new JWTHelper();

    const decoded = jwtHelper.verifyJwt(accessToken, "accessTokenPublicKey")

    res.locals.user = decoded
    log.info(decoded)

    return next()
}

export default deserializeUser