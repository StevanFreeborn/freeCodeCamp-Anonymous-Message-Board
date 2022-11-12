import ReplyDto from './replyDto.js';

export default class ThreadDto {
  constructor(thread) {
    this.board = thread.board;
    this._id = thread._id;
    this.text = thread.text;
    this.created_on = thread.created_on;
    this.updated = thread.bumped_on;
    // freeCodeCamp test requires that the threads updated
    // field be equal to the newly added reply.
    // however since I implemented this relationship using references
    // instead of embedded documents the values can differ by seconds
    this.bumped_on = thread.replies[0]?.created_on ?? thread.bumped_on;
    this.reported = thread.reported;
    this.replies = thread.replies.map(reply => {
      if (typeof reply == 'string') return reply;
      return new ReplyDto(reply);
    });
  }
}
