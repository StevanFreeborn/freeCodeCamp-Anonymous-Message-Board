export default class ReplyDto {
    constructor(reply) {
        this.thread = reply.thread;
        this._id = reply._id;
        this.text = reply.text;
        this.created_on = reply.created_on;
        this.bumped_on = reply.bumped_on;
    }
}