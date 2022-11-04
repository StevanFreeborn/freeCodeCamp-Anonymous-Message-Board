import mongoose from 'mongoose';

const threadSchemaOptions = {
    timestamps: {
        createdAt: 'created_on',
        updatedAt: 'bumped_on',
    },
}

const ThreadSchema = mongoose.Schema({
    board: { type: mongoose.Schema.Types.ObjectId, ref: 'boards', required: true, },
    text: { type: String, trim: true, required: true, },
    delete_password: { type: String, trim: true, required: true, },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'replies', }],
    reported: { type: Boolean, default: false, }
}, threadSchemaOptions);

const Thread = mongoose.model('threads', ThreadSchema);

export default Thread;