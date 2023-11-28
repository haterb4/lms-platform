import mongoose, { Schema } from "mongoose";

const lectureSchema = new Schema<ILecture>({
    title: { type: String, required: true },
    language: { type: String, required: true },
    url: { type: String, required: true },
    author: { type: String, required: true },
    duration: { type: Number, default: 0 },
},{
    timestamps: true
});

const LectureModel = mongoose.model<ILecture>('Lesson', lectureSchema);

export default LectureModel