import ReplyDto from './replyDto.js';

export default class ThreadDto {
  constructor(thread) {
    this.board = thread.board;
    this._id = thread._id;
    this.text = thread.text;
    this.created_on = thread.created_on;
    this.bumped_on = thread.bumped_on;
    this.reported = thread.reported;
    this.replies = thread.replies.map(reply => {
      if (typeof reply == 'string') return reply;
      return new ReplyDto(reply);
    });
  }
}
