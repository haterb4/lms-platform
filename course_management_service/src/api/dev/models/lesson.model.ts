import mongoose, { Schema, Document } from "mongoose";

interface ICLesson extends ILessons, Document {
  course: Schema.Types.ObjectId;
}

export const lessonSchema = new Schema<ICLesson>({
  title: { type: String, required: true },
  course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  videos: [{ type: Schema.Types.ObjectId, ref: 'Video' }],
  lectures: [{ type: Schema.Types.ObjectId, ref: 'Lecture' }],
  quizz: [{ type: Schema.Types.ObjectId, ref: 'Quizz' }],
});


const LessonModel = mongoose.model<ICLesson>('Lesson', lessonSchema);

export default LessonModel