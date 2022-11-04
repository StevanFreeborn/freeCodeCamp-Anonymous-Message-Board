const mongoose = require('mongoose');

const boardSchemaOptions = {
    timestamps: {
        createdAt: 'created_on',
        updatedAt: 'bumped_on',
    },
}

const BoardSchema = mongoose.Schema({
    name: { type: String, trim: true, },
    threads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'threads', }],
}, boardSchemaOptions);

const Board = mongoose.model('boards', BoardSchema);

module.exports = Board;