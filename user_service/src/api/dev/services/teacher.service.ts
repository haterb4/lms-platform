import { FilterQuery } from "mongoose";
import TeacherModel, { ITeacherProfile } from "../models/teacher.model";

class TeacherService implements IService {
    public async create(input: FilterQuery<ITeacherProfile>) {
        return await TeacherModel.create(input);
    }
    public async findOne(input: FilterQuery<ITeacherProfile>) {
        return await TeacherModel.findOne(input);
    }
    public async update(id: string, input: FilterQuery<ITeacherProfile>) {
        return await TeacherModel.findOneAndUpdate({ _id: id}, input);
    }
    public async delete(id: string) {
        return await TeacherModel.deleteOne({ _id: id });
    }
    public async find(input: FilterQuery<ITeacherProfile>) {
        return await TeacherModel.find(input);
    }
    public info(): void {
        throw new Error("Method not implemented.");
    }
    
}

export default TeacherService