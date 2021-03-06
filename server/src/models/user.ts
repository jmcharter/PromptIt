import { Schema, model, ObjectId } from 'mongoose';

interface User {
    username: string;
    displayName: string;
    email: string;
    password: string;
    createdOn: Date;
    lastAccessed: Date;
    prompts: [ObjectId];
}

const userSchema = new Schema<User>({
    displayName: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        default: function () {
            const _t = this as any;
            return _t.displayName.toLowerCase();
        },
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    password: { type: String, required: true },
    createdOn: { type: Date, default: new Date() },
    lastAccessed: { type: Date, default: new Date() },
    prompts: [
        { type: Schema.Types.ObjectId, ref: 'Prompt' }
    ]
});

const UserModel = model<User>('User', userSchema);

export default UserModel;