import mongoose, { Document, Schema } from "mongoose";
interface IIRetranscription extends IRetranscription, Document{
    video: { type: Schema.Types.ObjectId }
    author: string;
}

const retranscriptionSchema = new Schema<IIRetranscription>({
    author: { type: String },
    video: { type: Schema.Types.ObjectId },
    language: { type: String },
    content: { type: String },
}, {
    timestamps: true
});

const RetranscriptionModel = mongoose.model<IIRetranscription>("Retranscription", retranscriptionSchema);

export default RetranscriptionModel;