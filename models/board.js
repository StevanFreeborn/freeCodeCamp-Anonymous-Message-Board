import mongoose from 'mongoose';

const boardSchemaOptions = {
    timestamps: {
        createdAt: 'created_on',
        updatedAt: 'bumped_on',
    },
}

const BoardSchema = mongoose.Schema({
    name: { type: String, trim: true, required: true, },
    threads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'threads', }],
}, boardSchemaOptions);

const Board = mongoose.model('boards', BoardSchema);

export default Board;