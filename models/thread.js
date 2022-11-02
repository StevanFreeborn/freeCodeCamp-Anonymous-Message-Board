const mongoose = require('mongoose');

const threadSchemaOptions = {
    timestamps: true,
}

const ThreadSchema = mongoose.Schema({}, threadSchemaOptions);

const Thread = mongoose.model('threads', ThreadSchema);

module.exports = Thread;