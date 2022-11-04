import mongoose from 'mongoose';

const replySchemaOptions = {
    timestamps: {
        createdAt: 'created_on',
        updatedAt: 'bumped_on',
    },
}

const ReplySchema = mongoose.Schema({
    thread: { type: mongoose.Schema.Types.ObjectId, ref: 'threads' },
    text: { type: String, trim: true },
    deleted_password: { type: String, trim: true },
    reported: { type: Boolean, default: false, },
}, replySchemaOptions);

const Reply = mongoose.model('replies', ReplySchema);

export default Reply;