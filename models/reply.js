const mongoose = require('mongoose');

const replySchemaOptions = {
    timestamps: true,
}

const ReplySchema = mongoose.Schema({}, replySchemaOptions);

const Reply = mongoose.model('replies', ReplySchema);

module.exports = Reply;