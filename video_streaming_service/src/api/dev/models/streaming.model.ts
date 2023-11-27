import mongoose, { Schema, Document } from 'mongoose';

export interface IVideoStream extends VideoStream, mongoose.Document {}

const VideoStreamSchema = new Schema<IVideoStream>({
    user: { type: mongoose.Types.ObjectId, required: true, unique: true },
    media: { type: mongoose.Types.ObjectId, required: true,},  
},{
    timestamps: true
});

const VideoStreamModel = mongoose.model<IVideoStream & Document>('VideooStream', VideoStreamSchema);

export default VideoStreamModel