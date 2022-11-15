import createThread from './components/thread.js';
import createReply from './components/reply.js';

const board = window.location.pathname.split('/').reverse()[1];
const thread_id = window.location.pathname.split('/').reverse()[0];

$(async () => {
  try {
    const thread = await $.ajax({
      type: 'GET',
      url: `/api/replies/${board}`,
      data: { thread_id },
    });

    const threadComponent = createThread(board, thread);
    $('#thread-container').append(threadComponent);

    thread.replies.forEach(reply => {
      const replyComponent = createReply(board, reply);
      $(`#thread-${thread._id}-reply-container`).append(replyComponent);
    });
  } catch (err) {
    const text = err?.responseJSON?.error
      ? err.responseJSON.error
      : err?.responseText ?? `Unable to get thread ${thread_id}`;
    alert(text);
  }
});
