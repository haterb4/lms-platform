import mongoose, { Document, Schema, now } from "mongoose";

interface IIVideo extends IVideo, Document {
  lesson: Schema.Types.ObjectId;
}

const videoSchema = new Schema<IIVideo>({
  lesson: { type: Schema.Types.ObjectId, ref: "Lesson", required: true },
  title: { type: String, required: true },
  url: { type: String, unique: true, required: true },
  retranscription: { type: [{type: Schema.Types.ObjectId, ref: 'Retranscription'}]},
  author: { type: String, required: true },
  duration: { type: Number, required: true },
  uploadedAt: { type: Date, default: now()}
}, {
  timestamps: true,
});

const VideoModel = mongoose.model<IIVideo>("Video", videoSchema);

export default VideoModel;