import { get } from "lodash";
import config from "config";
import { FilterQuery, FlattenMaps, Types, UpdateQuery } from "mongoose";
import SessionModel, { ISession } from "../models/session.model";
import UserService from "./user.service";
import ServiceFactory from "./service.factory";
import JWTHelper from "../helpers/jwt.helper";
import log from "../../../config/Logger";

class SessionService implements IService{
  public info(): void {
    log.info("Session Service")
  }

  public async create(userId: string, userAgent: string): Promise<FlattenMaps<ISession & {_id: Types.ObjectId;}>> {
    const session = await SessionModel.create({ user: userId, userAgent });
    return session.toJSON();
  }

  public async findOne() {
    throw new Error("Method not implemented.");
  }

  public update(query: FilterQuery<ISession>, update: UpdateQuery<ISession>) {
    return SessionModel.updateOne(query, update);
  }

  public async delete() {
    throw new Error("Method not implemented.");
  }

  public find(query: FilterQuery<ISession>) {
    return SessionModel.find(query).lean();
  }
  
  public async reIssueAccessToken({
    refreshToken,
  }: {
    refreshToken: string;
  }){
    const jwtHelper: JWTHelper = new JWTHelper();
    const { decoded } = jwtHelper.verifyJwt(refreshToken, "refreshTokenPublicKey");

    if (!decoded || !get(decoded, "session")) return false;

    const session = await SessionModel.findById(get(decoded, "session"));

    if (!session || !session.valid) return false;
    const userService: UserService =  ServiceFactory.create('user') as UserService
    const user = await userService.findOne({ _id: session.user });

    if (!user) return false;

    const accessToken = jwtHelper.signJwt(
      { ...user, session: session._id },
      "accessTokenPrivateKey",
      { expiresIn: config.get("accessTokenTtl") } // 15 minutes
    );

    return accessToken;
  }
}

export default SessionService;