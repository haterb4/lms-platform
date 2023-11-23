import { Request, Response } from "express";
import log from "../../../config/Logger";
import StudentService from "../services/student.service";
import ServiceFactory from "../services/service.factory";

class StudentController implements IUserController {
    public async createUserHandler(req: Request, res: Response) {
        try {
            const _studentService: StudentService = <StudentService>ServiceFactory.create('student')
            const student = await _studentService.create(req.body);
            return res.status(200).send(student);
        } catch (e: any) {
            log.error(e.message)
            return res.status(409).send(e.message)
        }
    }
    public async updateUserHandler(req: Request, res: Response) {
        try {
            const _studentService: StudentService = <StudentService>ServiceFactory.create('student')
            const { id } = req.params

            const body = req.body
            delete body.auth
            
            const student = await _studentService.update(id, body);
            return res.status(200).send(student);
        } catch (e: any) {
            log.error(e.message)
            return res.status(409).send(e.message)
        }
    }
    public async deleteUserHandler(req: Request, res: Response) {
        try {
            const _studentService: StudentService = <StudentService>ServiceFactory.create('student')
            const { id } = req.params
            await _studentService.delete(id);
            return res.status(200).send({ success: true});
        } catch (e: any) {
            log.error(e.message)
            return res.status(409).send(e.message)
        }
    }
    public async getUserHandler(req: Request, res: Response) {
        try {
            const _studentService: StudentService = <StudentService>ServiceFactory.create('student')
            const { id } = req.params
            const student = await _studentService.findOne({ _id: id });
            return res.status(200).send({student});
        } catch (e: any) {
            log.error(e.message)
            return res.status(409).send(e.message)
        }
    }
    public async getStudentHandler(req: Request, res: Response) {
        try {
            const _studentService: StudentService = <StudentService>ServiceFactory.create('student')
            const id = res.locals.user.decoded._id
            const student = await _studentService.findOne({ auth: id });
            return res.status(200).send({student});
        } catch (e: any) {
            log.error(e.message)
            return res.status(409).send(e.message)
        }
    }

}

export default StudentController;