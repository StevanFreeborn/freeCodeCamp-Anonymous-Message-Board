const mongoose = require('mongoose');

const boardSchemaOptions = {
    timestamps: true,
}

const BoardSchema = mongoose.Schema({
    id: { type: mongoose.Types.ObjectId },
    name: { type: String, trim: true, }
}, boardSchemaOptions);

const Board = mongoose.model('boards', BoardSchema);

module.exports = Board;