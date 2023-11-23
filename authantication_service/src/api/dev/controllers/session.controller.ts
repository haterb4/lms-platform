import { Request, Response } from "express";
import ServiceFactory from "../services/service.factory";
import SessionService from "../services/session.service";
import UserService from "../services/user.service";
import JWTHelper from "../helpers/jwt.helper";
import config from 'config';
import { get } from "lodash";

class SessionController {
    public async createUserSessionHandler(req: Request, res: Response) {
        const sessionService = <SessionService>ServiceFactory.create('session');
        const userService = <UserService>ServiceFactory.create('user');
        // Validate the user's password
        
        const user = await userService.validatePassword(req.body);
      
        if (!user) {
          return res.status(401).send("Invalid email or password");
        }
      
        // create a session
        const session = await sessionService.create(user._id, req.get("user-agent") || "");
      
        // create an access token
        const jwtHelper: JWTHelper = new JWTHelper();
        const accessToken = jwtHelper.signJwt(
          { ...user, session: session._id },
          "accessTokenPrivateKey",
          { expiresIn: config.get("accessTokenTtl") } // 15 minutes,
        );
      
        // create a refresh token
        const refreshToken = jwtHelper.signJwt(
          { ...user, session: session._id },
          "refreshTokenPrivateKey",
          { expiresIn: config.get("refreshTokenTtl") } // 15 minutes
        );
      
        // return access & refresh tokens
      
        return res.send({ accessToken, refreshToken });
    }
      
    async getUserSessionsHandler(req: Request, res: Response) {
        const _sessionService = <SessionService>ServiceFactory.create('session');
        const userId = res.locals.user.decoded._id;
        const sessions = await _sessionService.find({ user: userId, valid: true });
        return res.send(sessions);
    }
    
    async refreshUserSessionsHandler(req: Request, res: Response) {
        const _sessionService = <SessionService>ServiceFactory.create('session');
        const jwtHelper: JWTHelper = new JWTHelper();

        const refreshToken = get(req, 'headers.x-refresh')
        const session = jwtHelper.verifyJwt(`${refreshToken}`, JWTHelper.publicRefreshToken)
        
        if(!session){
            return res.status(401).send("Could not refresh access token")
        }
        
        const sessionId = session.decoded.session;
        const user = session.decoded;
        
        delete user.iat;
        delete user.exp;
        delete user.session;

        
        // create an access token
        const accessToken = jwtHelper.signJwt(
          { ...user, session: sessionId },
          "accessTokenPrivateKey",
          { expiresIn: config.get("accessTokenTtl") } // 15 minutes,
        );
      
        // create a refresh token

        await _sessionService.update({ _id: sessionId }, { valid: true });
      
        return res.send({
          accessToken,
          refreshToken
        });
    }

    async deleteSessionHandler(req: Request, res: Response) {
        const _sessionService = <SessionService>ServiceFactory.create('session');
        const sessionId = res.locals.user.decoded.session;
      
        await _sessionService.update({ _id: sessionId }, { valid: false });
      
        return res.send({
          accessToken: null,
          refreshToken: null,
        });
    }
      
}

export default SessionController