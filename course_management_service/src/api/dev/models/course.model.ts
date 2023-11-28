import mongoose, { now } from "mongoose";

export interface ICourse extends mongoose.Document {
  instructor: { type: mongoose.Types.ObjectId, required: true };
  title: string;
  duration: number;
  skillLevel: string;
  Language: string;
  certificate: boolean;
  fullLifetimeAcces: boolean;
  description: string;
  lessonsCount: number;
  ratingsValue: number;
  ratingAverage: number;
  price: number;
  reduction: number;
  couponCode: number;
  quizzes: number;
  popular: boolean;
  bestSeller: boolean;
  notions: string[];
  requirements: string[];
  students: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  lessons: ILessons[]
}

const courseSchema = new mongoose.Schema(
  {
    instructor: { type: mongoose.Schema.Types.ObjectId },
    title: { type: String, unique: true },
    duration: { type: Number, default: 0 },
    skillLevel: { type: String },
    Language: { type: String },
    isCertificated: { type: Boolean, default: true },
    fullLifetimeAcces: { type: Boolean, default: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    lessonsCount: { type: Number, default: 0 },
    ratingsValue: { type: Number, default: 0 },
    ratingsAverage: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    reduction: { type: Number, default: 0 },
    couponCode: { type: String },
    quizzes: { type: Number, default: 0 },
    cover: { type: String, default: "course-cover" },
    isPopular: { type: Boolean, default: false },
    isBestSeller: { type: Boolean, default: false },
    notions: { type: [String], default: [] },
    requirements: { type: [String], default: [] },
    enrollments: { type: Number, default: 0 },
    students: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: false },
    publishedAt: { type: Date, default: now() },
    categories: { type: [String], require: true },
    lessons: [{type: mongoose.Schema.Types.ObjectId, ref: "Lesson"}]
  },
  {
    timestamps: true,
  }
);

const CourseModel = mongoose.model<ICourse>("Course", courseSchema);

export default CourseModel;
