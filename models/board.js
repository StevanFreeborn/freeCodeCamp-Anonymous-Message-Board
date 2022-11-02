const mongoose = require('mongoose');

const boardSchemaOptions = {
    timestamps: true,
}

const BoardSchema = mongoose.Schema({}, boardSchemaOptions);

const Board = mongoose.model('boards', BoardSchema);

module.exports = Board;