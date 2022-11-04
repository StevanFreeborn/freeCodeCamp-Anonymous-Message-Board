const mongoose = require('mongoose');

const threadSchemaOptions = {
    timestamps: {
        createdAt: 'created_on',
        updatedAt: 'bumped_on',
    },
}

const ThreadSchema = mongoose.Schema({
    board: { type: mongoose.Schema.Types.ObjectId, ref: 'boards', },
    text: { type: String, trim: true, },
    delete_password: { type: String, trim: true },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'replies', }],
    reported: { type: Boolean, default: false, }
}, threadSchemaOptions);

const Thread = mongoose.model('threads', ThreadSchema);

module.exports = Thread;