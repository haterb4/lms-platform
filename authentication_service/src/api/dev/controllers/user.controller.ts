import { Request, Response } from "express";
import log from "../../../config/Logger";
import UserService from "../services/user.service";
import { CreateUserInput, ResetPasswordInput, VerifyUserInput, subscribeRolesInput } from "../schemas/user.schema";
import ServiceFactory from "../services/service.factory";
import { generateCode } from "../helpers/code.helper";
import sendEmail from "../helpers/sendEmail";
import CronJobScheduler from "../helpers/cron.helper";
import { CRON_TIMEOUT } from "../../../config/constants";

const cronJob = new CronJobScheduler(CRON_TIMEOUT, false);

class UserController {
    public async createUserHandler(
      req: Request<{}, {}, CreateUserInput["body"]>,
      res: Response
    ) {
      try {
        const userService: UserService = <UserService>ServiceFactory.create('user')
        
        const user = await userService.create(req.body);
        const userOTP = generateCode()

        const update = await userService.update(user._id, { verificationCode: userOTP})

        if(update.modifiedCount === 0){
          await userService.delete(user._id);
          throw new Error("can not create user")
        }
        //this code should be sende by sms or by email to a customer
        const sendmessage = `your verification code is ${userOTP} paste it in the app form to continue`
        await sendEmail(user.email, sendmessage, 'Verify Account')

        log.info(sendmessage)

        return res.send(user);
      } catch (e: any) {
        log.error(e);
        return res.status(409).send(e.message);
      }
    }
    
    public async verifyUserHandler(
      req: Request<VerifyUserInput>,
      res: Response
    ) {
      try {
        const userService: UserService = <UserService>ServiceFactory.create('user')
        const id = req.params.id
        const verificationCode = req.params.code
    
        const user = await userService.findOneSecure({ _id: id })
    
        if (!user){
            return res.status(401).send({
                success: false,
                message: "Could not verify user"
            })
        }
    
        if(user.isVerified){
            return res.status(401).send({
                success: false,
                message: "user is already verified"
            })
        }
  
        if(user.verificationCode === Number.parseInt(verificationCode)){
  
            const update = await userService.update(user._id, { isVerified: true});
  
            if(update.modifiedCount === 0){
              throw new Error("can not create user")
            }
  
            return res.status(200).send({
                success: true,
                message: "User successfully verified"
            })
        }
    
        return res.status(401).send({
            success: false,
            message: "Could not verify user"
        })
      } catch (e: any) {
        log.error(e);
        return res.status(409).send(e.message);
      }
  }

  public async forgotPasswordHandler(req: Request<VerifyUserInput>, res: Response){
    try {
      const userService: UserService = <UserService>ServiceFactory.create('user')
  
      const message = "If a user with that email is registered, you will receive a password reset email"
      
      const {email} = req.body
  
      const user = await userService.findOne({ email })
  
      if(!user){
          log.debug(`User with email ${email} does not exist`)
          return res.status(401).send({
              success: false,
              message: message
          })
      }
  
      if(!user.isVerified){
          return res.status(401).send({
              success: false,
              message: "User is not verified"
          })
      }
  
      const passwordResetCode = generateCode()
  
      const update = await userService.update(user._id, { passwordResetCode });
      
      if(update.modifiedCount === 0){
        throw new Error("can not create user")
      }
  
  
      const emailmessage = `Password reset code: ${passwordResetCode}`
      log.info(emailmessage)
      await sendEmail(user.email, emailmessage, 'Reset Password')

      cronJob.configure(async () => {
        const update = await userService.update(user._id, { passwordResetCode: 0 });
        
        if(update.modifiedCount === 0){
          log.error("disallow reset password cron task failed on user: "+user._id)
          return;
        }
        log.info('reset password disallowed for user: '+user._id);
        return;
      });

      cronJob.execute();
      return res.send({
          success: true,
          userId: user._id,
          message: "check your email to get the reset password code"
      })
    } catch (e: any) {
      log.error(e);
      return res.status(409).send(e.message);
    }
  }

  public async resetPasswordHandler (
    req: Request<ResetPasswordInput["params"], {}, ResetPasswordInput["body"]>,
    res: Response
  ) {
    try {
      const userService: UserService = <UserService>ServiceFactory.create('user')
      const { id, code } = req.params
      
      const { password } = req.body
       const user = await userService.findOneSecure({ _id: id }, "+passwordResetCode")
  
       if(!user || !user.passwordResetCode || user.passwordResetCode !== Number.parseInt(code)){
          return res.status(400).send({
              success: false,
              message: "Could not reset user password"
          });
       }
  
      const hash = await userService.generatePassword(password)
      const update = await userService.update(user._id, { passwordResetCode: 0, password: hash});
    
      if(update.modifiedCount === 0){
        throw new Error("can not create user")
      }
      
      return res.send({
        success: true,
        message: "Successfully reset password"
      });
    } catch (e: any) {
      log.error(e);
      return res.status(409).send(e.message);
    }
  }
 
  public async subscribeRolesHandler(req: Request<{}, {}, subscribeRolesInput['body']>, res: Response){
    const userService: UserService = <UserService>ServiceFactory.create('user')
      const { roles } = req.body;

      const decoded = res.locals.user.decoded;

      const user = await userService.findOne({ _id: decoded._id });
      log.info(decoded)
      if(!user){
        return res.status(404).send({message: "user not found"});
      }
      let updated: boolean = false
      for(let role of roles){
        if (!user.roles.includes(role)){
          user.roles.push(role);
          updated = true;
        }
      }

      if(updated){
        await user.save();
      }

      return user;
  }

  public async getCurentUserHandler(req: Request, res: Response) {
    const user = res.locals.user.decoded;
    delete user.session;
    delete user.iat;
    delete user.exp;
    return res.send(user)
  }
}

export default UserController;