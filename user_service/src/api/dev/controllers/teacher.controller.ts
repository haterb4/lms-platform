import { Request, Response } from "express";
import TeacherService from "../services/teacher.service";
import ServiceFactory from "../services/service.factory";
import log from "../../../config/Logger";

class TeacherController implements IUserController {
    public async createUserHandler(req: Request, res: Response) {
        try {
            const _teacherService: TeacherService = <TeacherService>ServiceFactory.create('teacher')
            const student = await _teacherService.create(req.body);
            return res.status(200).send(student);
        } catch (e: any) {
            log.error(e.message)
            return res.status(409).send(e.message)
        }
    }
    public async updateUserHandler(req: Request, res: Response) {
        try {
            const _teacherService: TeacherService = <TeacherService>ServiceFactory.create('teacher')
            const { id } = req.params

            const body = req.body
            delete body.auth
            
            const teacher = await _teacherService.update(id, body);
            return res.status(200).send(teacher);
        } catch (e: any) {
            log.error(e.message)
            return res.status(409).send(e.message)
        }
    }
    public async deleteUserHandler(req: Request, res: Response) {
        try {
            const _teacherService: TeacherService = <TeacherService>ServiceFactory.create('teacher')
            const { id } = req.params
            await _teacherService.delete(id);
            return res.status(200).send({ success: true});
        } catch (e: any) {
            log.error(e.message)
            return res.status(409).send(e.message)
        }
    }
    public async getUserHandler(req: Request, res: Response) {
        try {
            const _teacherService: TeacherService = <TeacherService>ServiceFactory.create('teacher')
            const { id } = req.params
            const teacher = await _teacherService.findOne({ _id: id });
            return res.status(200).send({teacher});
        } catch (e: any) {
            log.error(e.message)
            return res.status(409).send(e.message)
        }
    }
    public async getTeacherHandler(req: Request, res: Response) {
        try {
            const _teacherService: TeacherService = <TeacherService>ServiceFactory.create('teacher')
            const id = res.locals.user.decoded._id
            const teacher = await _teacherService.findOne({ auth: id });
            return res.status(200).send({teacher});
        } catch (e: any) {
            log.error(e.message)
            return res.status(409).send(e.message)
        }
    }

}

export default TeacherController;