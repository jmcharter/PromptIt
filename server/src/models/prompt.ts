import { Schema, model, ObjectId } from 'mongoose';

interface Prompt {
    name: string;
    text: string;
    createdBy: ObjectId;
    createdOn: Date;
    upvotes: number;
    downvotes: number;
    removed: boolean;
}

const userSchema = new Schema<Prompt>({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    text: {
        type: String,
        required: true,
        trim: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdOn: {
        type: Date,
        default: new Date(),
    },
    upvotes: {
        type: Number,
        default: 0,
    },
    downvotes: {
        type: Number,
        default: 0,
    },
    removed: {
        type: Boolean,
        default: false,
    }
});

const PromptModel = model<Prompt>('Prompt', userSchema);

export default PromptModel;