import createThread from './components/thread.js';
import createReply from './components/reply.js';
import createAddThreadModal from './components/addThreadModal.js';

const board = decodeURI(window.location.pathname).split('/').reverse()[0];

$(async () => {
  $('#board-name').text(board);

  await displayThreads();

  $('#add-thread-button').click(e => {
    createAddThreadModal(board).show(e.currentTarget);
  });
});

const displayThreads = async () => {
  try {
    const threads = await $.ajax({
      type: 'GET',
      url: `/api/threads/${board}`,
    });

    threads.forEach(thread => {
      $('#threads-container').append(createThread(board, thread));

      thread.replies.forEach(reply => {
        $(`#thread-${thread._id}-reply-container`).append(
          createReply(board, reply)
        );
      });
    });
  } catch (error) {
    const text = err?.responseJSON?.error
      ? err.responseJSON.error
      : err?.responseText ?? `Unable to get thread ${thread_id}`;
    alert(text);
  }
};
