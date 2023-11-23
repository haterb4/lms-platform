import { FilterQuery } from "mongoose";
import StudentModel, { IStudentProfile } from "../models/student.model";

class StudentService implements IService {
    public async create(input: FilterQuery<IStudentProfile>): Promise<any> {
        return await StudentModel.create(input);
    }
    public async findOne(input: FilterQuery<IStudentProfile>): Promise<any> {
        return await StudentModel.findOne(input);
    }
    public async update(id: string, input: FilterQuery<IStudentProfile>) {
        return await StudentModel.findOneAndUpdate({ _id: id}, input);
    }
    public async delete(id: string): Promise<any> {
        return await StudentModel.deleteOne({ _id: id});
    }
    public async find(input: FilterQuery<IStudentProfile>): Promise<any> {
        return await StudentModel.find(input);
    }
    public  info(): void {
        throw new Error("Method not implemented.");
    }
    
}

export default StudentService;