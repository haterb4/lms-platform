import mongoose, { Schema, Document } from 'mongoose';

export interface ITeacherProfile extends IUser, mongoose.Document {
    teachingExperienceYears: number;
    subjectsTaught: string[];
}

const PhoneNumberSchema = new Schema<PhoneNumber>({
    comCode: { type: Number, required: true },
    phoneLine: { type: Number, required: true }
});

const AddressSchema = new Schema<Address>({
    country: { type: String, required: true },
    city: { type: String, required: true },
    neighborhood: { type: String, required: true }
});

const TeacherSchema = new Schema<ITeacherProfile>({
    auth: { type: mongoose.Types.ObjectId, required: true, unique: true },
    email: { type: String, required: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    firstName: { type: String, required: true },
    lastName: { type: String },
    nickName: { type: String },
    dateOfBirth: { type: Date, required: true },
    avatar: { type: String },
    pageImage: { type: String },
    phoneNumber: { type: PhoneNumberSchema, required: true },
    educationLevel: { type: String, required: true },
    interests: { type: [String] },
    address: { type: AddressSchema, required: true },
    teachingExperienceYears: { type: Number, required: true },
    subjectsTaught: { type: [String], default: [] },
    
},{
    timestamps: true
});

const TeacherModel = mongoose.model<ITeacherProfile & Document>('Teacher', TeacherSchema);

export default TeacherModel;
