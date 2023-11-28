import { FilterQuery } from "mongoose";
import { omit } from "lodash";
import UserModel, { IUser } from "../models/user.model";
import log from "../../../config/Logger";
import bcrypt from "bcryptjs"
import config from "config"

class UserService implements IService {
  public info(): void {
    log.info("User serive");
  }
  
  public async create(input: Partial<IUser>) {
    try {
      const user = await UserModel.create(input);
      return omit(user.toJSON(), "password", "verificationCode", "passwordResetCode");
    } catch (e: any) {
      throw new Error(e);
    }
  }

  public async validatePassword({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const user = await UserModel.findOne({ email }).select("+password");
  
    if (!user) {
      return false;
    }
    
    const isValid = await user.comparePassword(password);

    if (!isValid) return false;
  
    return omit(user.toJSON(), "password");
  }

  public async findOne(query: FilterQuery<IUser>){
    return UserModel.findOne(query).lean();
  }

  public async update(id: string, input: Partial<IUser>) {
    const user = await UserModel.updateOne({ _id: id }, {
      $set: input
    });

    return user;
  }

  public async delete(id: string) {
    return await UserModel.findOneAndDelete({ _id: id });
  }

  public async find(): Promise<any> {
    throw new Error("Method not implemented.");
  }

  public async findOneSecure(query: FilterQuery<IUser>, fields: string | string[] = "+verificationCode"){
    return await UserModel.findOne(query).select(fields).lean()
  }
  
  public async generatePassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
    const hash = bcrypt.hashSync(password, salt);
    return hash
  }
}

export default UserService

