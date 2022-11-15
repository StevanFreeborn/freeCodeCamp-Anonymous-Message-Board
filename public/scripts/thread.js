import createThreadElement from './components/threadElement.js';
import createReplyElement from './components/replyElement.js';

const board = window.location.pathname.split('/').reverse()[1];
const thread_id = window.location.pathname.split('/').reverse()[0];

$(async () => {
  await displayThread();
});

const displayThread = async () => {
  try {
    const thread = await $.ajax({
      type: 'GET',
      url: `/api/replies/${board}`,
      data: { thread_id },
    });

    const threadElement = createThreadElement(board, thread);
    $('#thread-container').append(threadElement);

    thread.replies.forEach(reply => {
      const replyElement = createReplyElement(board, reply);
      $(`#thread-${thread._id}-reply-container`).append(replyElement);
    });
  } catch (err) {
    const text = err?.responseJSON?.error
      ? err.responseJSON.error
      : err?.responseText ?? `Unable to get thread ${thread_id}`;
    alert(text);
  }
};