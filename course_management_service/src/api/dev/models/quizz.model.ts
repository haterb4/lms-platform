import mongoose, { Schema } from "mongoose";
interface IIQuizz extends IQuizz, mongoose.Document {
    lesson: Schema.Types.ObjectId;
}

const quizzSchema = new Schema<IIQuizz>({
    lesson: { type: Schema.Types.ObjectId, ref: "Lesson", required: true },
    categories: { type: [String], required: true },
    questions: [{ type: Schema.Types.ObjectId, ref: "QuizzQuestion" }],
},{
    timestamps: true
});

const QuizzModel = mongoose.model<IIQuizz>('Quizz', quizzSchema);

export default QuizzModel
