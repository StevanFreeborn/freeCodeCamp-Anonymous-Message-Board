export default class BoardDto {
    constructor(board) {
        this._id = board._id;
        this.name = board.name;
        this.created_on = board.created_on;
        this.bumped_on = board.bumped_on;
    }
}