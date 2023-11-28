import mongoose, { Schema } from "mongoose";

const quizzQuestionSchema = new Schema<IQuizzQuestions>({
    question: { type: String },
    propositions: { type: [String] },
    responses: { type: [Number] },
    difficulty: { type: String },
})

const QuizzQuestionModel = mongoose.model<IQuizzQuestions>('QuizzQuestion', quizzQuestionSchema);

export default QuizzQuestionModel