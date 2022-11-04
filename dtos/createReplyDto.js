export default class CreateReplyDto {
    constructor(reply) {
        this.thread = reply.thread;
        this._id = reply._id;
        this.text = reply.text;
        this.created_on = reply.created_on;
        this.bumped_on = reply.bumped_on;
        this.reported = reply.reported;
        this.delete_password = reply.delete_password;
    }
}