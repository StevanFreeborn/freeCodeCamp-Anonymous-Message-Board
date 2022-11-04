export default class CreateThreadDto {
    constructor(thread) {
        this.board = thread.board;
        this._id = thread._id;
        this.text = thread.text;
        this.created_on = thread.created_on;
        this.bumped_on = thread.bumped_on;
        this.reported = thread.reported;
        this.delete_password = thread.delete_password;
        this.replies = thread.replies;
    }
}